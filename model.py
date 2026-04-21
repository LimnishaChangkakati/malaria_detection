import tensorflow as tf
import os

print("Loading model...")

# Use path relative to this file — works on any machine
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'malaria_model_final.h5')

model = tf.keras.models.load_model(MODEL_PATH)
print("Model loaded!")


# =========================
# PREDICTION FUNCTION
# =========================
def predict_image(img_array):
    prob = float(model.predict(img_array, verbose=0)[0][0])

    prediction = "Parasitized" if prob > 0.5 else "Uninfected"
    confidence = prob if prob > 0.5 else 1 - prob

    return prediction, confidence, prob


# =========================
# GRADCAM HELPER
# =========================
def get_last_conv_layer_name():
    """Automatically finds last Conv layer for Grad-CAM"""
    for layer in reversed(model.layers):
        if isinstance(layer, tf.keras.layers.Conv2D):
            print(f"[GradCAM] Using layer: {layer.name}")
            return layer.name
    raise ValueError("No Conv2D layer found in model")