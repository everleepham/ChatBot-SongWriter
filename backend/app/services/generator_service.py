from app.clients.gemini_client import GeminiClient
from app.clients.musicgen_client import MusicGenClient
from app.services.audio_service import AudioService
from app.models.request_models import LyricsRequest, TitleRequest
from app.utils.prompt_utils import PromptBuilder
import logging


class GeneratorService:
    def __init__(self):
        self.gemini = GeminiClient(client=None)
        self.musicgen = MusicGenClient()  # dummy for now
        self.audio_service = AudioService()

    def generate_lyrics(self, lyrics_req: LyricsRequest) -> str:
        """
        Generate song lyrics using GeminiClient
        """
        prompt_builder = PromptBuilder(lyrics_req).lyrics()
        lyrics = self.gemini.output_lyrics(prompt_builder)
        logging.info(f"Lyrics generated: {lyrics[:100]}...")
        return lyrics

    def generate_title(self, title_req: TitleRequest, language="English") -> str:
        """
        Generate song title using GeminiClient
        """
        prompt_builder = PromptBuilder()
        title_prompt = prompt_builder.title(title_req, language)
        title = self.gemini.output_title(title_prompt)
        return title

    def generate_melody_from_audio(self, lyrics_req: LyricsRequest, audio_path) -> str:
        """
        Orchestrate the generation:
        1. Build prompts using PromptBuilder
        2. Extract melody from audio
        3. Extend the audio using musicgen
        """
        logging.info("Creating prompts for lyrics and melody generation.")
        prompt_builder = PromptBuilder(lyrics_req)

        logging.info("Extracting melody from audio input.")

        # extract meolody from audio file
        melody_path = self.audio_service.extract_melody_from_audio(
            audio_path=audio_path, style=prompt_builder.style
        )

        # clean audio
        logging.info("Cleaning extracted melody audio.")
        self.audio_service.clean_audio(melody_path)

        # convert to midi
        logging.info("Converting melody to MIDI format.")
        if melody_path.endswith(".mp3"):
            self.audio_service.convert_mp3_to_midi()
            logging.error(f"Converting melody at {melody_path} to MIDI...")
        elif melody_path.endswith(".wav"):
            self.audio_service.convert_wav_to_midi()
            logging.error(f"Converting melody at {melody_path} to MIDI...")
        logging.error("Cannot convert melody to MIDI: unsupported format.")

        # extend melody using musicgen
        logging.info("Extending melody using MusicGen.")
        midi_final_melody_path = self.musicgen.generate_melody_from_seed(
            seed_audio_path=melody_path, style=prompt_builder.style, length_seconds=90
        )
        # convert final melody to mp3
        logging.info("Converting final melody MIDI to MP3 format.")
        final_melody_path = self.audio_service.convert_midi_to_mp3(
            midi_final_melody_path
        )

        return final_melody_path

    def generate_song_from_audio_and_lyrics(
        self, lyrics: str, melody_path: str = None
    ) -> str:
        promt_builder = PromptBuilder()
        song_prompt = promt_builder.song(lyrics, melody_path)
        final_song_path = self.musicgen.generate_song_from_lyrics_and_melody(
            lyrics=lyrics, melody_path=melody_path, prompt=song_prompt
        )
        return final_song_path
