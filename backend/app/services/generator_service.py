from app.clients.gemini_client import GeminiClient
from app.clients.musicgen_client import MusicGenClient
from app.services.audio_service import AudioService
from app.services.karaoke_service import KaraokeService
import logging

class GeneratorService:
    def __init__(self):
        self.gemini = GeminiClient(client=None) 
        self.musicgen = MusicGenClient() # dummy for now
        self.audio_service = AudioService()
        self.karaoke_service = KaraokeService()

    def generate_song_from_lyrics_and_humming(self, lyrics_prompt: str, humming_path: str, style: str) -> str:
        """
        Orchestrate the generation:
        1. Generate lyrics using GeminiClient
        2. Extract melody from humming using AudioService
        3. Combine lyrics + melody using KaraokeService
        Returns: path to final song/audio file
        """
        logging.info("Starting song generation flow...")
        
        lyrics = self.gemini.generate_song(lyrics_prompt)
        melody_path = self.audio_service.extract_melody_from_humming(humming_path, style)
        final_song_path = self.karaoke_service.combine_lyrics_and_melody(lyrics, melody_path)
        
        return final_song_path
