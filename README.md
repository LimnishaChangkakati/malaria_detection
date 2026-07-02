# 🧬 MalariaScope AI - Blood Smear Analysis System

A deep learning-powered web application for **malaria detection from blood smear images**, enhanced with **visual explainability (Grad-CAM)** and a **modern dark-themed interface**.

---

## 🚀 Overview

**MalariaScope AI** is an end-to-end AI system that allows users to upload microscopic blood cell images and instantly detect the presence of *Plasmodium falciparum* parasites.

The system combines:

* 🔍 **Computer Vision (CNNs)**
* ⚡ **Real-time inference (Flask backend)**
* 🎯 **Explainable AI (Grad-CAM)**
* 🎨 **Modern UI/UX (Dark Theme Interface)**

---

## ✨ Key Features

### 🧠 AI-Powered Detection

* Binary classification: **Parasitized vs Uninfected**
* Built using **MobileNetV2 (Transfer Learning)**
* Optimized for fast and accurate predictions

---

### 🎯 Explainable AI (Grad-CAM)

* Visual heatmaps showing **where the model is focusing**
* Helps understand **model decisions**
* Displays:

  * Original image
  * Activation map

---

### 📊 Detailed Prediction Insights

* Confidence score (%)
* Latency (in ms)
* Uncertainty estimation
* Raw probability output

---

### 🖥️ Professional Dark UI

* Clean, modern, responsive interface
* Drag & drop image upload
* Real-time result visualization
* Clearly separated input & result panels

---

### ⚡ Real-Time Web App

* Built with **Flask**
* Instant inference after upload
* Runs locally or on network (LAN access supported)

---

### 🗂️ Structured Pipeline

* Image preprocessing
* Model inference
* Grad-CAM generation
* Result visualization

---

## 🏗️ Tech Stack

| Layer          | Technology              |
| -------------- | ----------------------- |
| ML Model       | TensorFlow / Keras      |
| Architecture   | MobileNetV2             |
| Backend        | Flask                   |
| Frontend       | HTML, CSS, JavaScript   |
| Explainability | Grad-CAM                |
| Dataset        | NIH Malaria Cell Images |

---

## 📁 Project Structure

```bash
Malaria_Cell_Detection/
│
├── app.py                  # Flask app
├── model.py                # Load trained model
├── train_model.py          # Model training script
├── preprocessing.py        # Image preprocessing
├── gradcam.py              # Grad-CAM implementation
│
├── templates/
│   └── index.html          # UI layout
│
├── static/
│   ├── style.css           # Styling
│   └── script.js           # Frontend logic
│
├── cell_images/            # Dataset
├── malaria_model_final.h5  # Trained model
```

---

## 🧪 How It Works

1. Upload a blood smear image
2. Image is preprocessed (resize + normalization)
3. Model predicts infection status
4. Grad-CAM generates heatmap
5. Results displayed with metrics

---

## ⚙️ Setup & Run

### 1. Clone the repo

```bash
git clone <your-repo-link>
cd Malaria_Cell_Detection
```

### 2. Create virtual environment

```bash
python -m venv venv
venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install tensorflow flask numpy opencv-python
```

### 4. Run the app

```bash
python app.py
```

---

## 🌐 Access

Open in browser:

```
http://127.0.0.1:5000
```

Or on your network:

```
http://<your-ip>:5000
```

---

## 📈 Model Performance

* Accuracy: ~93–95%
* Lightweight architecture (MobileNetV2)
* Fast inference (~100–150 ms)

---

## ⚠️ Disclaimer

> This project is for **educational and research purposes only**.
> It is **not a certified medical diagnostic tool**.

---

## 💡 Future Improvements

* Multi-class malaria classification
* Cloud deployment (AWS / Render)
* User authentication & history tracking
* Mobile-friendly optimization
* Dataset expansion for robustness

---

## 🤝 Contributors

* Limnisha Changkakati
* Natalia Mathews

---

## ⭐ Final Note

This project demonstrates:

* End-to-end ML pipeline
* Real-world healthcare application
* Explainable AI integration
* Full-stack AI deployment

---

> 🚀 Built with passion for AI, healthcare, and impactful technology.


## Contributors

* Natalia Mathews
* Limnisha Changkakati
* Prema Malipatil

---

## License

This project is intended for educational and research purposes.

---

## Support

If you find this project useful, consider giving it a star on GitHub.
