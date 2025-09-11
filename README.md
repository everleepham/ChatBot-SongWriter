# AI Songwriter & Poet

A web application that lets users generate **songs** and **poems** using Google Gemini AI. Users can provide **theme, style, and mood** (for songs) or **theme and style** (for poems), and get AI-generated content in real time. Users can also favorite outputs for later reference.  

---

## Features

- **AI Songwriter**: Generate songs based on `theme`, `style`, and `mood`.
- **AI Poet**: Generate poems based on `theme` and `style`.
- **Favorites**: Save your favorite lyrics or poems.
- **Real-time Chat Interface**: Messages from both user and AI are displayed in a chat-like UI.
- **FastAPI Backend**: Handles AI requests and serves content.
- **Next.js Frontend**: Interactive and responsive user interface.

---

## Tech Stack

- **Frontend**: React (Next.js 13), TypeScript, TailwindCSS, Lucide Icons, Shadcn UI components  
- **Backend**: FastAPI, Python 3.11  
- **AI**: Google Gemini API (`gemini-2.5-flash`)  
- **State Management**: React Context for favorites  
- **Environment Management**: `.env` for API keys  

---

## Project Structure

```
├── README.md
├── backend
│   ├── __pycache__
│   ├── gemini_client.py
│   ├── main.py
│   └── requirements.txt
├── docs
└── frontend
    ├── app
    ├── components
    ├── components.json
    ├── hooks
    ├── lib
    ├── next-env.d.ts
    ├── next.config.mjs
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── pnpm-lock.yaml
    ├── postcss.config.mjs
    ├── public
    ├── styles
    └── tsconfig.json
```


---

## Setup

### Prerequisites

- Node.js 18+
- Python 3.11+
- Poetry or pip for Python dependencies
- Google Gemini API key  

### Backend

1. Create a `.env` file:

```env
GENAI_API_KEY=your_google_gemini_api_key_here
NEXT_PUBLIC_BACKEND_URL=your_backend_url
```
2. Install dependencies:

```bash
pip install fastapi uvicorn python-dotenv google-genai
```

3. Run backend:

```bash
uvicorn main:app --reload
```

### Frontend

1. Install node:
```bash
cd frontend
npm install
```

2. Run frontend:
```bash
npm run dev
```

---
## Usage


