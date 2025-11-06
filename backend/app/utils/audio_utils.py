import os
from typing import Optional
from pydub import AudioSegment
from fastapi import UploadFile
import librosa

def convert_audio_format(input_path: str, output_path: str, format: str) -> None:
    """
    Convert audio from one format to another (e.g., WAV -> MP3)

    Args:
        input_path: Path to input audio
        output_path: Path to save converted audio
        format: Target format ('wav', 'mp3', etc.)
    """
    audio = AudioSegment.from_file(input_path)
    audio.export(output_path, format=format)
    print(f"Audio converted: {input_path} -> {output_path} ({format})")

def extract_features(audio_path: str) -> dict:
    """
    TODO: Extract features from audio (pitch, tempo, melody seed)
    Returns a dict with relevant features
    """
    pass

def normalize_audio(audio_path: str, output_path: Optional[str] = None) -> str:
    """
    TODO: Clean audio (remove noise, normalize volume)
    Return path to normalized audio
    """
    pass

def midi_to_audio(midi_path: str, output_path: str) -> None:
    """
    TODO: Convert MIDI file to playable audio (wav/mp3)
    """
    pass

def save_uploaded_file(upload_file, save_dir: str) -> str:
    """
    TODO: Save FastAPI UploadFile to disk
    Return saved file path
    """
    pass
