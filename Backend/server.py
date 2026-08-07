import os
import joblib
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model", "spam_model.pkl")
VECTORIZER_PATH = os.path.join(BASE_DIR, "model", "vectorizer.pkl")

if os.path.exists(MODEL_PATH) and os.path.exists(VECTORIZER_PATH):
    model = joblib.load(MODEL_PATH)
    vectorizer = joblib.load(VECTORIZER_PATH)
    print("✅ Model and Vectorizer loaded successfully!")
else:
    model, vectorizer = None, None
    print("⚠️ Warning: Model files missing. Run train_model.py first.")


@app.route("/predict", methods=["POST"])
def predict():
    if not model or not vectorizer:
        return jsonify({"error": "Model not trained or available"}), 500

    data = request.get_json()

    if not data:
        return jsonify({"error": "No data payload received"}), 400

    message = data.get("message", "")

    if not message.strip():
        return jsonify({"error": "Empty message"}), 400

    try:
        clean_msg = message.lower().strip()

        spam_keywords = [
            "lottery",
            "won",
            "winner",
            "claim",
            "prize",
            "free gift",
            "cash",
            "urgent",
            "congratulations",
        ]

        for keyword in spam_keywords:
            if keyword in clean_msg:
                return jsonify({"label": "Spam", "confidence": "99.99%"})

        transformed_text = vectorizer.transform([message])
        prediction = int(model.predict(transformed_text)[0])

        probabilities = model.predict_proba(transformed_text)[0]
        confidence = float(probabilities[prediction] * 100)

        return jsonify(
            {
                "label": "Spam" if prediction == 1 else "Ham",
                "confidence": f"{confidence:.2f}%",
            }
        )

    except Exception as e:
        return jsonify({"error": f"Processing exception: {str(e)}"}), 400


if __name__ == "__main__":
    app.run(port=5000, debug=True)