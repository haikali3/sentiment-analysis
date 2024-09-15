import React from 'react'
import './App.css'
import SentimentAnalysis from './components/SentimentAnalysis'

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-center text-gray-800">Tweet Checker 🦜</h1>
      <SentimentAnalysis />
    </div>
  )
}

export default App