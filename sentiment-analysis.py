import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
import pandas as pd
import matplotlib.pyplot as plt
import ssl

# Bypass ssl
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

# Download necessary NLTK data
nltk.download('vader_lexicon')

# Get Polarity scores for the input text
def analyze_sentiment(text):
    sia = SentimentIntensityAnalyzer() 
    return sia.polarity_scores(text)['compound']
    # return -1 or 1

# Sample data (you could replace this with real data from a CSV file or API)
data = [
    "I love this product! It's amazing!",
    "This is okay, but could be better.",
    "I'm really disappointed with the quality.",
    "The customer service was excellent!",
    "I'm not sure how I feel about this.",
    "Holy shit you are good"
]

# Analyze sentiment for each piece of text
sentiments = [analyze_sentiment(text) for text in data]

# Create a DataFrame
df = pd.DataFrame({'text': data, 'sentiment': sentiments})

# Visualize the results
plt.figure(figsize=(10, 6))
plt.bar(df.index, df['sentiment'])
plt.axhline(y=0, color='b', linestyle='-')
plt.title('Sentiment Analysis Results')
plt.xlabel('Text Index')
plt.ylabel('Sentiment Score')
plt.tight_layout()
plt.show()

# Print results
print(df)