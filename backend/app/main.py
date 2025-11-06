from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend.app.clients.gemini_client import songwriter
from backend.app.models.request_models import LyricsRequest
from backend.app.models.request_models import HummingRequest


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # port frontend 
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/songwriter")
def create_lyrics(req: LyricsRequest):
    prompt = f"Write a {req.mood} {req.style} song about {req.theme}"
    lyrics = songwriter(prompt)
    return {"lyrics": lyrics}
