import os
import logging
from dotenv import load_dotenv
from google import genai
from google.genai import types
from asyncio import to_thread

load_dotenv()
API_KEY = os.getenv("GENAI_API_KEY")


logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] [%(levelname)s] %(message)s"
)

client = genai.Client(api_key=API_KEY)

class GeminiClient:
    """
    Wrapper class for Gemini API.
    Methods:
        - generate_content
        - generate_song
        - generate_melody
    """

    def __init__(self, client):
        self.client = client
        if not API_KEY:
            raise ValueError("GENAI_API_KEY not found. Please check your .env file.")
        logging.info("GeminiClient initialized successfully.")


    async def generate_content(self, prompt: str, model: str, thinking_budget: int) -> str:
        """
        - Call Gemini API with given model & prompt
        - Return generated text
        """

        logging.info(f"[GeminiClient] Generating content using model={model}")
        logging.debug(f"[GeminiClient] Prompt: {prompt[:200]}...")

        try:
            response = await to_thread(
                self.client.models.generate_content,
                model=model,
                contents=prompt,
                config=types.GenerateContentConfig(
                    thinking_config=types.ThinkingConfig(thinking_budget=thinking_budget)
                )
            )
        except Exception as e:
            logging.error(f"[GeminiClient] Exception occurred: {e}")
            text = getattr(response, "text", None)
            if not text:
                logging.warning("[GeminiClient] Empty response received from Gemini API.")
                return "[Error] No response from Gemini model."

            logging.info(f"[GeminiClient] Response received ({len(text)} chars).")
            return text

    def generate_song(self, prompt: str) -> str:
        try:
            logging.info(f"[GeminiClient] Generating song with prompt: {prompt[:100]}...")
            result = self.generate_content(prompt, model="gemini-2.5-flash", thinking_budget=3)
            logging.info(f"[GeminiClient] Song generation completed.")
            return result
        except Exception as e:
            logging.error(f"[GeminiClient] Error generating song: {e}")
            raise


    def generate_melody(self, melody_prompt: str) -> str:
        """
        TODO: Call music generation client (MusicGen / Chirp / etc.)
        Steps:
            1. Build prompt using PromptBuilder.melody()    
            2. Send to musicgen_client
            3. Return generated audio/midi URL
        """
        pass


    def generate_title(self, title_prompt: str) -> str:
        try: 
            logging.info(f"[GeminiClient] Generating title with prompt: {title_prompt[:100]}...")
            result = self.generate_content(title_prompt, model="gemini-2.5-flash", thinking_budget=1)
            logging.info(f"[GeminiClient] Title generation completed.")
            return result
        except Exception as e:
            logging.error(f"[GeminiClient] Error generating title: {e}")
            raise
        
