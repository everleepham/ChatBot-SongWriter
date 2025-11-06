import os
import logging
from dotenv import load_dotenv
from asyncio import to_thread

load_dotenv()

API_KEY = os.getenv("MUSIC_API_KEY")


logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] [%(levelname)s] %(message)s"
)

client = None  # Placeholder for actual music generation client

class MusicGenClient:
    """
    Wrapper for music generation API.
    TODO: currently dummy methods for testing API integration.
    """

    def __init__(self):
        self.client = client
        if not API_KEY:
            raise ValueError("MUSIC_API_KEY not found. Please check your .env file.")
        logging.info("... initialized successfully.")

    def generate_melody_from_seed(self, seed_audio_path: str, style: str, length_seconds: int) -> str:
        """
        Input:
            seed_audio_path: path to user hummed audio
            style: optional style
            length_seconds: length of generated melody
        Output:
            path to generated melody (dummy: return same file or placeholder path)
        """
        # TODO: implement API call later
        return "dummypath/to/generated/melody.mid"

    def midi_to_audio(self, midi_path: str, output_path: str) -> str:
        """
        Input:
            midi_path: path to MIDI file
            output_path: path to export audio
        Output:
            path to generated audio (dummy: return output_path directly)
        """
        # TODO: implement conversion later
        return output_path

    def generate_song_from_lyrics(self, lyrics_text: str, melody_audio_path: str = None) -> str:
        """
        Input:
            lyrics_text: generated lyrics
            melody_audio_path: optional melody to combine
        Output:
            path to final song (dummy: return placeholder path)
        """
        # TODO: implement actual combination
        return "path/to/final_song.mp3"
