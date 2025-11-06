from app.clients.gemini_client import GeminiClient
from app.clients.musicgen_client import MusicGenClient
from app.services.audio_service import AudioService
from app.services.karaoke_service import KaraokeService
from app.models.request_models import LyricsRequest, HummingRequest
from app.utils.prompt_utils import PromptBuilder
import logging

class GeneratorService:
    def __init__(self):
        self.gemini = GeminiClient(client=None) 
        self.musicgen = MusicGenClient() # dummy for now
        self.audio_service = AudioService()
        self.karaoke_service = KaraokeService()

    def generate_song_from_lyrics_and_humming(self, lyrics_req: LyricsRequest, humming_req: HummingRequest, humming_path) -> str:
        """
        Orchestrate the generation:
        1. Build prompts using PromptBuilder
        2. Generate lyrics with Gemini
        3. Extract melody from humming
        4. Combine lyrics + melody into final song
        """
        logging.info("Creating prompts for lyrics and melody generation.")
        prompt_builder = PromptBuilder(lyrics_req, humming_req)
        lyrics_prompt = prompt_builder.lyrics()
        lyrics = self.gemini.generate_song(lyrics_prompt)
        logging.info(f"Lyrics generated: {lyrics[:100]}...")

        logging.info("Extracting melody from humming input.")
        # extract meolody from humming
        melody_path = self.audio_service.extract_melody_from_humming(
            humming_path=humming_path, 
            style=prompt_builder.style
        )

        # clean audio
        logging.info("Cleaning extracted melody audio.")
        self.audio_service.clean_audio(melody_path)

        # convert to midi
        logging.info("Converting melody to MIDI format.")
        if melody_path.endswith(".mp3"):
            self.audio_service.convert_mp3_to_midi
            logging.error(f"Converting melody at {melody_path} to MIDI...")
        elif melody_path.endswith(".wav"):
            self.audio_service.convert_wav_to_midi
            logging.error(f"Converting melody at {melody_path} to MIDI...")
        logging.error("Cannot convert melody to MIDI: unsupported format.")


        # extend melody using musicgen
        logging.info("Extending melody using MusicGen.")
        final_melody_path = self.musicgen.generate_melody_from_seed(
            seed_audio_path=melody_path,
            style=prompt_builder.style,
            length_seconds=prompt_builder.length_seconds
        )
        
        logging.info("Combining lyrics and melody into final song.")
        final_song_path = self.karaoke_service.combine_lyrics_and_melody(lyrics, final_melody_path)

        return final_song_path

