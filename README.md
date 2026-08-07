<<<<<<< HEAD
🛡️ Spam Detection Machine Learning Pipeline
A lightweight, robust machine learning pipeline for text classification designed to distinguish between legitimate messages (ham) and unwanted spam using Natural Language Processing (NLP).

🚀 Overview
This project implements a binary text classification model using Python and scikit-learn. It processes text data via TF-IDF (Term Frequency-Inverse Document Frequency) vectorization and trains a Multinomial Naive Bayes classifier to accurately detect spam messages based on textual patterns and keywords.

🛠️ Tech Stack & Libraries
Python (Programming Language)

Pandas (Data Manipulation)

Scikit-Learn (Machine Learning & NLP Utilities)

TfidfVectorizer for text feature extraction

MultinomialNB for classification

train_test_split for dataset partitioning

Joblib (Model Serialization / Persistence)

⚙️ How It Works
Dataset Preparation: A structured DataFrame containing messages tagged as either ham or spam is loaded. Labels are mapped numerically (ham = 0, spam = 1).

Data Splitting: The data is divided into training and testing sets to evaluate generalization capability.

Feature Extraction: The text messages are converted into numerical TF-IDF feature matrices while filtering out English stop words.

Model Training: A Multinomial Naive Bayes algorithm is trained on the vectorized training data.

Artifact Saving: Both the trained classification model (spam_model.pkl) and the fitted text vectorizer (vectorizer.pkl) are serialized and saved inside a dedicated model/ directory for real-time inference.
=======
# SMS-Spam-Detection
>>>>>>> 5e8b08472828446e4e6fac1e57730dfe2c3bb8b3
