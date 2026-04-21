import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras import layers, models

# =========================
# SETTINGS
# =========================
IMG_SIZE = (128, 128)
BATCH_SIZE = 32

# 👉 MAKE SURE THIS FOLDER EXISTS IN SAME DIRECTORY
DATASET_PATH = r'C:\Users\Limnisha Changkakati\Downloads\Malaria_Cell_Detection-main\cell_images'

# =========================
# DATA
# =========================
datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2
)

train_data = datagen.flow_from_directory(
    DATASET_PATH,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='binary',
    subset='training'
)

val_data = datagen.flow_from_directory(
    DATASET_PATH,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='binary',
    subset='validation'
)

# =========================
# MODEL
# =========================
base_model = MobileNetV2(
    weights='imagenet',
    include_top=False,
    input_shape=(128, 128, 3)
)

base_model.trainable = False

x = base_model.output
x = layers.GlobalAveragePooling2D()(x)
x = layers.BatchNormalization()(x)
x = layers.Dense(128, activation='relu')(x)
x = layers.Dropout(0.5)(x)
output = layers.Dense(1, activation='sigmoid')(x)

model = models.Model(inputs=base_model.input, outputs=output)

model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

# =========================
# TRAIN
# =========================
model.fit(
    train_data,
    validation_data=val_data,
    epochs=5
)

# =========================
# SAVE MODEL
# =========================
model.save("malaria_model_final.h5")

print("✅ Model saved as malaria_model_final.h5")