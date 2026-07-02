# 🦠 MalariaScope AI
### AI-Powered Malaria Cell Detection using Deep Learning, Transfer Learning, and Explainable AI

<p align="center">

![Python](https://img.shields.io/badge/Python-3.11-blue?style=for-the-badge&logo=python)
![TensorFlow](https://img.shields.io/badge/TensorFlow-Deep%20Learning-FF6F00?style=for-the-badge&logo=tensorflow)
![Keras](https://img.shields.io/badge/Keras-CNN-D00000?style=for-the-badge&logo=keras)
![Flask](https://img.shields.io/badge/Flask-Web%20Application-black?style=for-the-badge&logo=flask)
![License](https://img.shields.io/badge/License-Educational-orange?style=for-the-badge)

</p>

---

# 🩺 Overview

**MalariaScope AI** is an AI-powered healthcare application designed to automatically detect malaria parasites from microscopic blood smear images using **Transfer Learning** and **Explainable AI**.

The system provides rapid, accurate predictions while offering visual explanations through **Grad-CAM heatmaps**, enabling users to understand how the deep learning model arrives at its decisions.

Built as a lightweight **Flask web application**, MalariaScope AI delivers an intuitive interface for real-time malaria screening, making it suitable for educational, research, and healthcare technology demonstrations.

---

# 🚀 Key Features

🦠 Binary Malaria Detection (Parasitized vs Uninfected)

🧠 Deep Learning using MobileNetV2 Transfer Learning

🔥 Explainable AI with Grad-CAM Heatmaps

📊 Prediction Confidence & Probability Scores

⚠️ Risk Level & Medical Advice Generation

📈 Session Statistics Dashboard

📁 Batch Image Prediction

⚡ Real-Time Image Processing

🖥️ Modern Responsive Web Interface

☁️ Lightweight Flask Deployment

---

# 🧠 AI Pipeline

```
Blood Smear Image
        │
        ▼
 Image Preprocessing
        │
        ▼
 MobileNetV2 CNN
        │
        ▼
 Infection Prediction
        │
        ▼
 Prediction Confidence
        │
        ▼
 Explainability
 ├── Grad-CAM
 ├── Risk Analysis
 └── Medical Recommendation
```

---

# 🏗️ Project Architecture

```
               User Upload
                    │
                    ▼
          Blood Smear Image
                    │
                    ▼
          Image Preprocessing
                    │
                    ▼
        MobileNetV2 CNN Model
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
   Infection Status      Confidence Score
          │                   │
          └─────────┬─────────┘
                    ▼
           Grad-CAM Visualization
                    │
                    ▼
      Risk Assessment & Medical Advice
```

---

# 📂 Project Structure

```
MalariaScope-AI/
│
├── app.py                     # Flask application
├── model.py                   # Load trained CNN model
├── preprocessing.py           # Image preprocessing
├── gradcam.py                 # Explainable AI
├── train_model.py             # Training script
├── utils.py                   # Helper functions
│
├── templates/
│   └── index.html
│
├── static/
│   ├── style.css
│   └── script.js
│
├── cell_images/
│   ├── Parasitized/
│   └── Uninfected/
│
├── malaria_model_final.h5
├── requirements.txt
└── README.md
```

---

# 🧬 Deep Learning Model

| Component | Description |
|-----------|-------------|
| Architecture | MobileNetV2 |
| Framework | TensorFlow / Keras |
| Learning Method | Transfer Learning |
| Classification | Binary Classification |
| Classes | Parasitized, Uninfected |

---

# 📊 Explainable AI

To improve transparency and trust, the system integrates **Grad-CAM (Gradient-weighted Class Activation Mapping)**.

### 🔥 Grad-CAM

Highlights the regions within a blood smear image that contribute most to the model's prediction.

Benefits include:

- Visual explanation of predictions
- Improved model interpretability
- Better understanding of parasite localization
- Increased confidence in AI-assisted diagnosis

---

# 📈 Prediction Dashboard

For every uploaded image, the application displays:

- Infection Status
- Prediction Confidence
- Raw Probability Score
- Risk Level
- Medical Recommendation
- Prediction Latency
- Timestamp
- Original Image
- Grad-CAM Heatmap

---

# 📁 Dataset

### NIH Malaria Cell Images Dataset

The project uses the publicly available **NIH Malaria Cell Images Dataset**, containing approximately **27,500 microscopic blood smear images**.

Classes:

- 🦠 Parasitized
- ✅ Uninfected

The dataset is widely used for benchmarking malaria detection algorithms.

---

# ⚙️ Tech Stack

### Programming

- Python

### Deep Learning

- TensorFlow
- Keras
- MobileNetV2

### Backend

- Flask
- Flask-CORS

### Frontend

- HTML
- CSS
- JavaScript

### Computer Vision

- OpenCV
- Pillow
- NumPy

### Explainability

- Grad-CAM

---

# 📈 Model Performance

| Metric | Performance |
|---------|------------|
| Model | MobileNetV2 |
| Accuracy | ~93–95% |
| Classification | Binary |
| Inference | Real-Time |
| Deployment | Flask |

> **Note:** Performance values depend on dataset splits, preprocessing, and evaluation methodology.

---

# 🖥️ Installation

Clone the repository

```bash
git clone https://github.com/yourusername/MalariaScope-AI.git
```

Navigate to the project

```bash
cd MalariaScope-AI
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run the application

```bash
python app.py
```

---

# 🚀 Usage

1. Launch the Flask application.
2. Upload a blood smear image.
3. The image is preprocessed automatically.
4. The MobileNetV2 model predicts the infection status.
5. View prediction confidence and probability.
6. Explore Grad-CAM visualizations.
7. Review generated medical advice and risk assessment.

---

# 🌟 Dashboard Highlights

✅ Single Image Prediction

✅ Batch Image Prediction

✅ Confidence Scores

✅ Risk Assessment

✅ Medical Advice Generation

✅ Session Analytics

✅ Prediction History

✅ Grad-CAM Explainability

✅ Responsive Dark UI

---

# 🔮 Future Improvements

- Multi-class malaria parasite classification
- Parasite counting & parasitemia estimation
- Cloud deployment with Docker
- REST API integration
- Electronic Health Record (EHR) support
- Mobile application
- Support for additional blood-borne diseases
- Vision Transformer (ViT) implementation

---

# 🤝 Contributing

Contributions are welcome!

To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a Pull Request.

---

# 📜 Disclaimer

This project is intended **solely for educational and research purposes**.

It is **not a certified medical diagnostic system** and should not replace professional clinical judgment.

---

# 👨‍💻 Authors

Developed by the **Limnisha Changkakati and Natalia Mathews**

If you found this project useful, consider giving it a ⭐ on GitHub!

---

# 🌟 Support

If you enjoyed this project,

⭐ Star the repository

🍴 Fork it

📢 Share it with others

Together, let's build AI solutions that improve healthcare! 🩺🚀
