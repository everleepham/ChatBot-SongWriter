from pydantic import BaseModel
from typing import Optional

class LyricsRequest(BaseModel):
    theme: str
    style: str
    mood: str
    language: str = "English"

class HummingRequest(BaseModel):
    style: Optional[str] = None
    theme: Optional[str] = None
    instrument_type: Optional[str] = None

class TitleRequest(BaseModel):
    lyrics: LyricsRequest

