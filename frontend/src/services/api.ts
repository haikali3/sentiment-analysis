// src/services/api.ts
interface SentimentResult {
  text: string;
  sentiment: {
    neg: number;
    neu: number;
    pos: number;
    compound: number;
  };
}

export const analyzeSentiment = async (texts: string[]): Promise<SentimentResult[]> => {
  try {
    console.log('Sending request to:', 'http://localhost:8000/analyze');
    console.log('Request payload:', JSON.stringify({ texts }));

    const response = await fetch('http://localhost:8000/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ texts }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response data:', data);
    return data;
  } catch (error) {
    console.error('Error in analyzeSentiment:', error);
    throw error;
  }
};