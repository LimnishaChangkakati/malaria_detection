import tensorflow as tf
import numpy as np
import cv2
from model import model, get_last_conv_layer_name


def make_gradcam_heatmap(img_array):
    last_conv_layer_name = get_last_conv_layer_name()

    grad_model = tf.keras.models.Model(
        inputs=model.inputs,
        outputs=[model.get_layer(last_conv_layer_name).output, model.output]
    )

    img_tensor = tf.cast(img_array, tf.float32)

    with tf.GradientTape() as tape:
        conv_outputs, predictions = grad_model(img_tensor)
        loss = predictions[:, 0]

    grads = tape.gradient(loss, conv_outputs)

    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
    conv_outputs = conv_outputs[0]

    heatmap = conv_outputs @ pooled_grads[..., tf.newaxis]
    heatmap = tf.squeeze(heatmap)

    heatmap = np.maximum(heatmap.numpy(), 0)

    if np.max(heatmap) != 0:
        heatmap /= np.max(heatmap)

    return heatmap


def overlay_heatmap(heatmap, image):
    heatmap_resized = cv2.resize(heatmap, (image.shape[1], image.shape[0]))
    heatmap_uint8 = np.uint8(255 * heatmap_resized)
    heatmap_colored = cv2.applyColorMap(heatmap_uint8, cv2.COLORMAP_JET)

    # image may be RGB from PIL; convert to BGR for cv2
    image_bgr = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    superimposed = cv2.addWeighted(image_bgr, 0.6, heatmap_colored, 0.4, 0)

    return superimposed