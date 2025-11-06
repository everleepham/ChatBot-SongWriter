from pydantic import BaseModel
from typing import Optional

class LyricsRequest(BaseModel):
    theme: str
    style: str
    mood: str
    language: str = "English"

class SongRequest(BaseModel):
    style: Optional[str] = None
    theme: Optional[str] = None
    length_seconds: int = 30
    instrument_type: str = "piano"

class TitleRequest(BaseModel):
    lyrics: str

