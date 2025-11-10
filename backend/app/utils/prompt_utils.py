from app.models.request_models import LyricsRequest
from app.models.request_models import HummingRequest

class PromptBuilder:
    def __init__(self, lyrics_req: LyricsRequest):
        self.theme = lyrics_req.theme
        self.style = lyrics_req.style
        self.mood = lyrics_req.mood
        self.language = lyrics_req.language or "English"

    def lyrics(self) -> str:
        """Generate a prompt to create song lyrics."""
        return f"Write a {self.mood} {self.style} song about {self.theme} in {self.language}."

    def melody(self, seed_midi_path: str, length_seconds: int) -> str:
        """Generate a prompt to extend a melody from a seed MIDI/audio."""
        return f"Extend the melody from {seed_midi_path} in {self.style} style to {length_seconds} seconds."
    
    def title(self, lyrics: str, language: str) -> str:
        """Generate a prompt to create a song title."""
        return f"Create a short catchy title for this {self.mood} song with lyrics: {lyrics} in {language}."
    

    # def share_caption(self, content_type: str = "song", theme: str = None) -> str:
    #     """Generate a prompt/caption for sharing content on social media."""
    #     return f"Check out my new {content_type} inspired by {theme}! 🎵"
