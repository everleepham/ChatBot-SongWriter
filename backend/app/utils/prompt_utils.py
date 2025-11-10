from app.models.request_models import LyricsRequest
from app.models.request_models import HummingRequest

class PromptBuilder:
    def __init__(self, lyrics_req: LyricsRequest = None):
        self.theme = lyrics_req.theme if lyrics_req else None
        self.style = lyrics_req.style if lyrics_req else None
        self.mood = lyrics_req.mood if lyrics_req else None
        self.language = lyrics_req.language or "English"


    def lyrics(self) -> str:
        """Generate a prompt to create song lyrics."""
        return f"Write a {self.mood} {self.style} song about {self.theme} in {self.language}."

    def melody(self, seed_midi_path: str, length_seconds: int) -> str:
        """Generate a prompt to extend a melody from a seed MIDI/audio."""
        return f"Extend the melody from {seed_midi_path} in {self.style} style to {length_seconds} seconds."
    
    def song(self, lyrics: str, melody_path: str) -> str:
        """Generate a prompt to create a full song from lyrics and melody."""
        return f"Combine the following lyrics with the melody from {melody_path} to create a full song:\n{lyrics}"
    
    def title(self, lyrics: str, language: str) -> str:
        """Generate a prompt to create a song title."""
        return f"Create a short catchy title for this {self.mood} song with lyrics: {lyrics} in {language}."
    

    # def share_caption(self, content_type: str = "song", theme: str = None) -> str:
    #     """Generate a prompt/caption for sharing content on social media."""
    #     return f"Check out my new {content_type} inspired by {theme}! 🎵"
