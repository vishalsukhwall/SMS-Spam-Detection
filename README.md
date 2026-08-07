# 🛡️ SMS Spam Detection Pipeline

<div align="center">

![Python](https://img.shields.io/badge/Python-3.10%2B-blue?style=for-the-badge&logo=python&logoColor=white)
![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

A lightweight, robust machine learning pipeline and web application for text classification, designed to instantly distinguish between legitimate messages (**ham**) and unwanted **spam** using Natural Language Processing (NLP).

</div>

---

## 🚀 Overview

This project implements a binary text classification model using Python and `scikit-learn`. It processes raw text data via **TF-IDF (Term Frequency-Inverse Document Frequency)** vectorization and trains a **Multinomial Naive Bayes** classifier to accurately detect spam messages based on textual patterns and keywords. It features a complete backend-frontend architecture for real-time predictions.

---

## 🛠️ Tech Stack & Libraries

*   **Programming Language:** Python
*   **Data Manipulation:** Pandas
*   **Machine Learning & NLP:** 
    *   `Scikit-Learn` (`TfidfVectorizer`, `MultinomialNB`, `train_test_split`)
*   **Model Persistence:** Joblib
*   **Backend & Frontend:** Flask, HTML, CSS, JavaScript

---

## ⚙️ How It Works

1. **Dataset Preparation:** A structured DataFrame containing text messages tagged as either `ham` or `spam` is loaded. Labels are mapped numerically (`ham` = 0, `spam` = 1).
2. **Data Splitting:** The dataset is partitioned into training and testing sets to evaluate model generalization.
3. **Feature Extraction:** Text messages are transformed into numerical feature matrices using **TF-IDF**, filtering out English stop words.
4. **Model Training:** A **Multinomial Naive Bayes** algorithm is trained on the vectorized corpus.
5. **Artifact Saving:** Both the trained classification model (`spam_model.pkl`) and the fitted text vectorizer (`vectorizer.pkl`) are serialized and stored inside the `model/` directory for fast real-time inference.

---

## 📂 Project Structure

```text
SMS-Spam-Detection/
│
├── Backend/
│   ├── model/
│   │   ├── spam_model.pkl      # Trained Naive Bayes classifier
│   │   └── vectorizer.pkl      # Fitted TF-IDF vectorizer
│   ├── server.py               # Flask API server
│   ├── train_model.py          # Script for data processing & training
│   └── requirements.txt        # Python dependencies
│
├── Frontend/
│   ├── index.html              # Web interface UI
│   ├── style.css               # UI styling
│   └── script.js               # Frontend logic & API calls
│
└── README.md                   # Project documentation
