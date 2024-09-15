import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { analyzeSentiment } from '../services/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SentimentAnalysis: React.FC = () => {
  const [currentText, setCurrentText] = useState('');
  const [texts, setTexts] = useState<string[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const addText = () => {
    if (currentText.trim()) {
      setTexts([...texts, currentText.trim()]);
      setCurrentText('');
    }
  };

  const handleAnalyzeSentiment = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await analyzeSentiment(texts);
      setResults(data);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      setError('Failed to analyze sentiment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = {
    labels: results.map((_, index) => `Text ${index + 1}`),
    datasets: [
      {
        label: 'Positive',
        data: results.map(result => result.sentiment.pos),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Neutral',
        data: results.map(result => result.sentiment.neu),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Negative',
        data: results.map(result => result.sentiment.neg),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true, max: 1 },
    },
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Sentiment Analysis Results' },
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-6 text-center text-gray-800">Sentiment Analysis</h1>
      <div className="mb-6">
        <input
          type="text"
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
          placeholder="Enter tweet to analyze"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addText}
          className="mt-2 w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add Text
        </button>
      </div>
      {texts.length > 0 && (
        <div className="mb-6 bg-gray-100 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Texts to Analyze:</h2>
          <ul className="list-disc pl-5 space-y-1">
            {texts.map((text, index) => (
              <li key={index} className="text-gray-600">{text}</li>
            ))}
          </ul>
        </div>
      )}
      <button
        onClick={handleAnalyzeSentiment}
        disabled={isLoading || texts.length === 0}
        className={`w-full p-3 rounded-md transition duration-300 ${isLoading || texts.length === 0
          ? 'bg-gray-300 cursor-not-allowed'
          : 'bg-green-500 text-white hover:bg-green-600'
          }`}
      >
        {isLoading ? 'Analyzing...' : 'Analyze All Texts'}
      </button>
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      {results.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Results:</h2>
          <div className="mb-6">
            <Bar data={chartData} options={chartOptions} />
          </div>
          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-md">
                <p className="font-semibold text-gray-800">Text {index + 1}: <span className="font-normal">{result.text}</span></p>
                <p className="mt-2 text-gray-700">Compound Score: <span className="font-semibold">{result.sentiment.compound.toFixed(3)}</span></p>
                <div className="flex justify-between mt-2 space-x-2">
                  <div className="flex-1 bg-red-100 p-2 rounded text-center">
                    <p className="font-bold text-red-700">Negative</p>
                    <p className="text-red-600">{result.sentiment.neg.toFixed(3)}</p>
                  </div>
                  <div className="flex-1 bg-blue-100 p-2 rounded text-center">
                    <p className="font-bold text-blue-700">Neutral</p>
                    <p className="text-blue-600">{result.sentiment.neu.toFixed(3)}</p>
                  </div>
                  <div className="flex-1 bg-green-100 p-2 rounded text-center">
                    <p className="font-bold text-green-700">Positive</p>
                    <p className="text-green-600">{result.sentiment.pos.toFixed(3)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SentimentAnalysis;