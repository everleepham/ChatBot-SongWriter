from pydantic import BaseModel
from typing import Optional

class LyricsRequest(BaseModel):
    theme: str
    style: str
    mood: str
    language: str = "English"

class TitleRequest(BaseModel):
    lyrics: str

