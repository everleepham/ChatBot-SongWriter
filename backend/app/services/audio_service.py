import logging

class AudioService:
    def __init__(self):
        logging.info("AudioService initialized.")

    def extract_melody_from_humming(self, humming_path: str, style: str) -> str:
        """
        Input: path to user hummed audio
        Output: path to extracted/generated melody
        TODO: dummy return for now
        """
        logging.info(f"Extracting melody from {humming_path} with style {style}...")
        return "path/to/generated/melody.mid"
    
    def clean_audio(self, audio_path: str) -> str:
        logging.info(f"Cleaning audio at {audio_path}...")
        return "path/to/cleaned/audio.wav"

    def convert_midi_to_mp3(self, midi_path: str) -> str:
        logging.info("Converting MIDI to MP3...")
        return "path/to/converted/audio.mp3"
    
    def convert_midi_to_wav(self, midi_path: str) -> str:
        logging.info("Converting MIDI to WAV...")
        return "path/to/converted/audio.wav"
    
    def convert_mp3_to_midi(self, mp3_path: str) -> str:
        logging.info("Converting MP3 to MIDI...")
        return "path/to/converted/audio.mid"
    
    def convert_wav_to_midi(self, wav_path: str) -> str:
        logging.info("Converting WAV to MIDI...")
        return "path/to/converted/audio.mid"
