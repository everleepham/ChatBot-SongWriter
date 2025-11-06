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
    try:
        humming_path = None
        humming_req = HummingRequest()
        if humming_file:
            humming_path = f"/tmp/{humming_file.filename}"
            with open(humming_path, "wb") as f:
                f.write(await humming_file.read())
            humming_req.audio_file_path = humming_path

        humming_req.style = lyrics_req.style

        final_song_path = generator_service.generate_song_from_lyrics_and_humming(
            lyrics_req=lyrics_req,
            humming_req=humming_req,
            humming_path=humming_file
        )

        return {
            "lyrics": lyrics_req.theme,
            "final_song_path": final_song_path
        }

    except Exception as e:
        logging.error(f"Error generating content: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
