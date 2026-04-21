def get_uncertainty(confidence):
    if confidence > 0.90:
        return "Very Low"
    elif confidence > 0.85:
        return "Low"
    elif confidence > 0.65:
        return "Medium"
    return "High"


def get_advice(prediction, confidence):
    if prediction == "Parasitized":
        if confidence > 0.90:
            return "High confidence of infection. Seek immediate medical attention and confirm with a lab test."
        elif confidence > 0.75:
            return "Likely infection detected. Strongly recommend laboratory confirmation and medical consultation."
        return "Possible infection. Recommend immediate lab smear test and physician evaluation."
    else:
        if confidence > 0.90:
            return "No malaria parasites detected. Continue preventive measures in endemic areas."
        return "No infection detected, but confidence is moderate. Consider repeat testing if symptoms persist."


def get_severity(parasitemia):
    if parasitemia == 0:
        return "None"
    elif parasitemia < 1:
        return "Mild"
    elif parasitemia < 5:
        return "Moderate"
    elif parasitemia < 10:
        return "Severe"
    return "Critical"


def get_risk_level(prediction, confidence):
    if prediction == "Parasitized":
        if confidence > 0.90:
            return "CRITICAL"
        elif confidence > 0.75:
            return "HIGH"
        return "MODERATE"
    else:
        if confidence > 0.85:
            return "MINIMAL"
        return "LOW"