from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from PIL import Image
import io
import time
import datetime
import numpy as np
import cv2
import base64

from gradcam import make_gradcam_heatmap, overlay_heatmap
from model import predict_image, model
from preprocessing import preprocess
from utils import get_uncertainty, get_advice, get_severity, get_risk_level

app = Flask(__name__)
CORS(app)

prediction_history = []
session_stats = {
    "total": 0,
    "infected": 0,
    "uninfected": 0,
    "total_latency": 0
}


# =========================
# HOME
# =========================
@app.route("/")
def home():
    return render_template("index.html")


# =========================
# SINGLE PREDICTION + GRADCAM
# =========================
@app.route("/predict", methods=["POST"])
def predict():
    # Support both "image" and "file" field names
    file = request.files.get("image") or request.files.get("file")
    if not file:
        return jsonify({"error": "No image provided"}), 400

    start = time.time()

    img = Image.open(io.BytesIO(file.read())).convert("RGB")
    img_array = preprocess(img)

    prediction, confidence, prob = predict_image(img_array)

    uncertainty = get_uncertainty(confidence)
    advice = get_advice(prediction, confidence)
    risk = get_risk_level(prediction, confidence)

    latency = round((time.time() - start) * 1000, 1)

    # Grad-CAM
    img_np = np.array(img)
    heatmap = make_gradcam_heatmap(img_array)
    overlay = overlay_heatmap(heatmap, img_np)

    _, buffer = cv2.imencode('.jpg', overlay)
    heatmap_base64 = base64.b64encode(buffer).decode('utf-8')

    # Original image as base64 too
    _, orig_buffer = cv2.imencode('.jpg', cv2.cvtColor(img_np, cv2.COLOR_RGB2BGR))
    orig_base64 = base64.b64encode(orig_buffer).decode('utf-8')

    # Update session stats
    session_stats["total"] += 1
    session_stats["total_latency"] += latency
    if prediction == "Parasitized":
        session_stats["infected"] += 1
    else:
        session_stats["uninfected"] += 1

    result = {
        "prediction": prediction,
        "confidence": f"{confidence:.1%}",
        "confidence_raw": round(confidence * 100, 1),
        "uncertainty": uncertainty,
        "advice": advice,
        "risk": risk,
        "latency": latency,
        "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "heatmap": heatmap_base64,
        "original": orig_base64,
        "prob_raw": round(prob, 4)
    }

    prediction_history.append({k: v for k, v in result.items() if k not in ["heatmap", "original"]})

    return jsonify(result)


# =========================
# BATCH PREDICTION
# =========================
@app.route("/predict-batch", methods=["POST"])
def predict_batch():
    files = request.files.getlist("images")
    if not files:
        return jsonify({"error": "No images provided"}), 400

    results = []
    infected = 0
    total = len(files)

    for file in files:
        img = Image.open(io.BytesIO(file.read())).convert("RGB")
        img_array = preprocess(img)
        prediction, confidence, _ = predict_image(img_array)

        if prediction == "Parasitized":
            infected += 1

        results.append({
            "name": file.filename,
            "prediction": prediction,
            "confidence": f"{confidence:.1%}"
        })

    parasitemia = (infected / total) * 100
    severity = get_severity(parasitemia)

    session_stats["total"] += total
    session_stats["infected"] += infected
    session_stats["uninfected"] += (total - infected)

    return jsonify({
        "total": total,
        "infected": infected,
        "uninfected": total - infected,
        "parasitemia": f"{parasitemia:.2f}%",
        "parasitemia_raw": round(parasitemia, 2),
        "severity": severity,
        "results": results
    })


# =========================
# SESSION STATS
# =========================
@app.route("/stats", methods=["GET"])
def get_stats():
    avg_latency = round(session_stats["total_latency"] / session_stats["total"], 1) if session_stats["total"] > 0 else 0
    return jsonify({
        **session_stats,
        "avg_latency": avg_latency,
        "infection_rate": f"{(session_stats['infected'] / session_stats['total'] * 100):.1f}%" if session_stats["total"] > 0 else "N/A"
    })


# =========================
# HISTORY
# =========================
@app.route("/history", methods=["GET"])
def get_history():
    return jsonify({"history": prediction_history[-20:]})  # last 20


# =========================
# RUN SERVER
# =========================
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)