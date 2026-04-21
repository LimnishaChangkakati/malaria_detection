import cv2
import numpy as np

IMG_SIZE = (128, 128)

def preprocess(img):
    img = img.resize(IMG_SIZE)
    img_np = np.array(img)

    # CLAHE enhancement in LAB color space
    img_np = cv2.cvtColor(img_np, cv2.COLOR_RGB2LAB)
    l, a, b = cv2.split(img_np)
    l = cv2.equalizeHist(l)
    img_np = cv2.merge((l, a, b))
    img_np = cv2.cvtColor(img_np, cv2.COLOR_LAB2RGB)

    img_np = img_np / 255.0
    return np.expand_dims(img_np.astype(np.float32), axis=0)