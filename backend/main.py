from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from gemini_client import songwriter, poemwriter


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # port frontend 
    allow_methods=["*"],
    allow_headers=["*"],
)

class LyricsRequest(BaseModel):
    theme: str
    style: str
    mood: str
    
class PoemRequest(BaseModel):
    theme: str
    style: str

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/songwriter")
def create_lyrics(req: LyricsRequest):
    prompt = f"Write a {req.mood} {req.style} song about {req.theme}"
    lyrics = songwriter(prompt)
    return {"lyrics": lyrics}


@app.post("/poemwriter")
def create_poem(req: PoemRequest):
    prompt = f"Write a short {req.style} poem about {req.theme}"
    poem = poemwriter(prompt)
    return {"poem": poem}