from fastapi import APIRouter, UploadFile, HTTPException
from app.models.request_models import LyricsRequest, HummingRequest
from app.models.response_models import LyricsResponse
from app.services.generator_service import GeneratorService
import logging

router = APIRouter()
generator_service = GeneratorService()


@router.post("/generate/content")
async def generate_content(
    lyrics_req: LyricsRequest,
    humming_file: UploadFile = None
):
    """
    Endpoint to generate song from lyrics + optional humming audio.
    """
    try:
        logging.info("Received generate request")

        # Save uploaded humming file if exists
        humming_path = None
        if humming_file:
            # TODO: save file to temp path, return path
            humming_path = f"/tmp/{humming_file.filename}"
            # TODO: implement save_uploaded_file from audio_utils

        # Orchestrate generation
        final_song_path = generator_service.generate_song_from_lyrics_and_humming(
            lyrics_prompt=f"{lyrics_req.theme}, {lyrics_req.style}, {lyrics_req.mood}",
            humming_path=humming_path,
            style=lyrics_req.style
        )

        return {
            "lyrics": f"{lyrics_req.theme} - {lyrics_req.style} - {lyrics_req.mood}",
            "final_song_path": final_song_path
        }

    except Exception as e:
        logging.error(f"Error generating content: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
