from pydantic import BaseModel
from typing import Optional

class LyricsResponse(BaseModel):
    lyrics: str

class MelodyResponse(BaseModel):
    melody_url: str
    midi_url: Optional[str] = None

class GenerateContentResponse(BaseModel):
    lyrics: Optional[str] = None
    melody_url: Optional[str] = None
    midi_url: Optional[str] = None
    status: str = "success"

class ErrorResponse(BaseModel):
    error_message: str
    status: str = "error"