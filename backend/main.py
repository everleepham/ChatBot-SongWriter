import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from google.genai import types

load_dotenv()
api_key = os.getenv("GENAI_API_KEY")
client = genai.Client(api_key=api_key)

def generate_lyrics(prompt: str) -> str:
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            thinking_config=types.ThinkingConfig(thinking_budget=2)
        )
    )
    return response.text

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # port frontend Vite
    allow_methods=["*"],
    allow_headers=["*"],
)


class LyricsRequest(BaseModel):
    theme: str
    style: str
    mood: str

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/generate_lyrics")
def create_lyrics(req: LyricsRequest):
    prompt = f"Write a {req.mood} {req.style} song about {req.theme}"
    lyrics = generate_lyrics(prompt)
    return {"lyrics": lyrics}
