from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from nltk.sentiment import SentimentIntensityAnalyzer
import nltk
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Update this to match your Vite frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

nltk.download('vader_lexicon', quiet=True)
sia = SentimentIntensityAnalyzer()

class TextInput(BaseModel):
    texts: List[str]

@app.post("/analyze")
async def analyze_sentiment(input: TextInput):
    logger.info(f"Received request with {len(input.texts)} texts")
    try:
        results = []
        for text in input.texts:
            sentiment = sia.polarity_scores(text)
            results.append({
                "text": text,
                "sentiment": sentiment
            })
        logger.info(f"Analysis completed successfully for {len(results)} texts")
        return results
    except Exception as e:
        logger.error(f"Error during sentiment analysis: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)