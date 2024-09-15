# Sentiment Analysis Project

This project consists of a React frontend built with Vite and a Python backend using FastAPI to perform sentiment analysis on text input.



![Tweet Checker #1](https://github.com/haikali3/sentiment-analysis/blob/main/frontend/src/assets/pic-1.png)
![Tweet Checker #2](https://github.com/haikali3/sentiment-analysis/blob/main/frontend/src/assets/pic-2.png)

## Project Structure

```
sentiment-analysis-project/
├── frontend/         # React frontend
└── backend/          # Python FastAPI backend
```

## Frontend Setup

The frontend is a React application built with Vite and uses pnpm as the package manager.

### Prerequisites

- Node.js (v14 or later)
- pnpm (v6 or later)

### Installation

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   pnpm install
   ```

### Running the Frontend

To start the development server:

```
pnpm dev
```

The application will be available at `http://localhost:5173` by default.

### Building for Production

To create a production build:

```
pnpm build
```

The build output will be in the `dist` directory.

## Backend Setup

The backend is a Python application using FastAPI.

### Prerequisites

- Python 3.7 or later
- pip (Python package installer)

### Installation

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. It's recommended to use a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required packages:
   ```
   pip install fastapi uvicorn nltk
   ```

### Running the Backend

To start the FastAPI server:

```
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.

## Usage

1. Start both the frontend and backend servers.
2. Open your browser and go to `http://localhost:5173`.
3. Enter text in the input field and click "Add Text" to add it to the analysis list.
4. In this example, Elon Musk's tweets are used as dataset.
![Elon Musk Tweet #1](https://github.com/haikali3/sentiment-analysis/blob/main/frontend/src/assets/elon-musk-1.png)
![Elon Musk Tweet #2](https://github.com/haikali3/sentiment-analysis/blob/main/frontend/src/assets/elon-musk-2.png)
![Elon Musk Tweet #3](https://github.com/haikali3/sentiment-analysis/blob/main/frontend/src/assets/elon-musk-3.png)

5. Click "Analyze All Texts" to perform sentiment analysis.
6. View the results in the chart and detailed breakdown below.


## API Endpoints

- POST `/analyze`: Accepts a JSON payload with a list of texts and returns sentiment analysis results.

## Environment Variables

### Frontend
- `VITE_API_URL`: URL of the backend API (default: `http://localhost:8000`)

### Backend
- `FRONTEND_URL`: URL of the frontend application (for CORS configuration)
