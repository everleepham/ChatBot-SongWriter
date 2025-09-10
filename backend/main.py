from fastapi import FastAPI
from pydantic import BaseModel
from gemini_client import generate_lyrics

app = FastAPI()

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
