class PromptBuilder:
    def __init__(self, theme: str, style: str = "pop", mood: str = "happy", language: str = "English"):
        self.theme = theme
        self.style = style
        self.mood = mood
        self.language = language

    def lyrics(self, theme: str = None, style: str = None, mood: str = None, language: str = None) -> str:
        """Generate a prompt to create song lyrics."""
        theme = theme or self.theme
        style = style or self.style
        mood = mood or self.mood
        language = language or self.language
        return f"Write a {mood} {style} song about {theme} in {language}."

    def melody(self, seed_midi_path: str, style: str = None, length_seconds: int = 30) -> str:
        """Generate a prompt to extend a melody from a seed MIDI/audio."""
        style = style or self.style
        return f"Extend the melody from {seed_midi_path} in {style} style to {length_seconds} seconds."

    def share_caption(self, content_type: str = "song", theme: str = None) -> str:
        """Generate a prompt/caption for sharing content on social media."""
        theme = theme or self.theme
        return f"Check out my new {content_type} inspired by {theme}! 🎵"
