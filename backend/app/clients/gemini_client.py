import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

# TODO: Load env
load_dotenv()
API_KEY = os.getenv("GENAI_API_KEY")

# TODO: Initialize client once, reusable
client = genai.Client(api_key=API_KEY)

class GeminiClient:
    """
    Wrapper class for Gemini API.
    Methods:
        - generate_lyrics
        - generate_poem
        - (future) generate_melody
    """

    def __init__(self, client):
        self.client = client

    def generate_content(self, prompt: str, model: str, thinking_budget: int) -> str:
        """
        TODO:
        - Call Gemini API with given model & prompt
        - Return generated text
        - Add error handling
        - Add logging
        """
        response = self.client.models.generate_content(
            model=model,
            contents=prompt,
            config=types.GenerateContentConfig(
                thinking_config=types.ThinkingConfig(thinking_budget=thinking_budget)
            )
        )
        return response.text

    # TODO: Songwriter
    def generate_song(self, prompt: str) -> str:
        return self.generate_content(prompt, model="gemini-2.5-flash", thinking_budget=2)

    # TODO: Poemwriter
    def generate_poem(self, prompt: str) -> str:
        return self.generate_content(prompt, model="gemini-2.5-flash", thinking_budget=1)
    
    def generate_melody(self, melody_prompt: str) -> str:
        return self.generate_content(melody_prompt, model="gemini-2.5-melody", thinking_budget=3)

    # TODO: (Optional) generate_melody for future audio/melody features
    # def generate_melody(self, prompt: str) -> str:
    #     pass
