import os
from dotenv import load_dotenv

load_dotenv()

GEN_API_KEY = os.getenv("GENAI_API_KEY")
MUSIC_API_KEY = os.getenv("MUSIC_API_KEY")

import logging
logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] [%(levelname)s] %(message)s"
)