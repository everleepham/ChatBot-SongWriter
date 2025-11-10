from app.models.request_models import LyricsRequest, SongRequest

class PromptBuilder:
    def __init__(self, lyrics_req: LyricsRequest = None):
        self.lyric_req = lyrics_req if lyrics_req else None

    def lyrics(self) -> str:
        """Generate a prompt to create song lyrics."""
        return f"Write a {self.lyric_req.mood} {self.lyric_req.style} song about {self.lyric_req.theme} in {self.language}."

    def melody(self, seed_midi_path: str, seconds) -> str:
        """Generate a prompt to extend a melody from a seed MIDI/audio."""
        return f"Extend the melody from {seed_midi_path} into a {self.lyric_req.style} melody about {self.lyric_req.theme} for {seconds}."
    
    def song(self, lyrics: str, melody_path: str) -> str:
        """Generate a prompt to create a full song from lyrics and melody."""
        return f"Combine the following lyrics with the melody from {melody_path} to create a full song:\n{lyrics}"
    
    def title(self, lyrics: str, language: str) -> str:
        """Generate a prompt to create a song title."""
        return f"Create a short catchy title for this {self.mood} song with lyrics: {lyrics} in {language}."
    

    # def share_caption(self, content_type: str = "song", theme: str = None) -> str:
    #     """Generate a prompt/caption for sharing content on social media."""
    #     return f"Check out my new {content_type} inspired by {theme}! 🎵"
