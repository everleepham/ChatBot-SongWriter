from app.models.request_models import LyricsRequest
from app.models.request_models import HummingRequest

class PromptBuilder:
    def __init__(self, lyrics_req: LyricsRequest, humming_req: HummingRequest):
        self.theme = lyrics_req.theme
        self.style = lyrics_req.style
        self.mood = lyrics_req.mood
        self.language = lyrics_req.language or "English"
        self.instrument_type = humming_req.instrument_type or "piano"
        self.length_seconds = humming_req.length_seconds or 30

    def lyrics(self) -> str:
        """Generate a prompt to create song lyrics."""
        return f"Write a {self.mood} {self.style} song about {self.theme} in {self.language}."

    def melody(self, seed_midi_path: str) -> str:
        """Generate a prompt to extend a melody from a seed MIDI/audio."""
        return f"Extend the melody from {seed_midi_path} in {self.style} style to {self.length_seconds} seconds."
    
    def title(self, lyrics: str, language: str) -> str:
        """Generate a prompt to create a song title."""
        return f"Create a short catchy title for this {self.mood} song with lyrics: {lyrics} in {language}."
    # def share_caption(self, content_type: str = "song", theme: str = None) -> str:
    #     """Generate a prompt/caption for sharing content on social media."""
    #     return f"Check out my new {content_type} inspired by {theme}! 🎵"
