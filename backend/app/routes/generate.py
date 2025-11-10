from fastapi import APIRouter, UploadFile, HTTPException
from app.models.request_models import LyricsRequest, SongRequest, TitleRequest
from app.models.response_models import LyricsResponse
from app.services.generator_service import GeneratorService
import logging

router = APIRouter()
generator_service = GeneratorService()


@router.post("/generate/lyrics")
async def generate_lyrics(lyrics_req: LyricsRequest, title_language):
    try:
        lyrics = generator_service.generate_lyrics(lyrics_req)

        title_req = TitleRequest(lyrics=lyrics)
        title = generator_service.generate_title(title_req, title_language)

        return {
            "title": title,
            "lyrics": lyrics
        }

    except Exception as e:
        logging.error(f"Error generating lyrics: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    

@router.post("/generate/melody")
async def generate_melody(
    lyrics_req: LyricsRequest,
    song_req: SongRequest,
    audio_file: UploadFile):
    try:
        audio_path = f"/tmp/{audio_file.filename}"
        with open(audio_path, "wb") as f:
            f.write(await audio_file.read())
        # song_req.audio_file_path = audio_path

        final_melody_path = generator_service.generate_melody_from_audio(
            lyrics_req=lyrics_req,
            song_req=song_req,
            audio_path=audio_path
        )
        return {
            "lyrics": lyrics_req.theme,
            "final_melody_path": final_melody_path
        }

    except Exception as e:
        logging.error(f"Error generating melody: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
    
@router.post("/generate/content")
async def generate_content(
    lyrics_req: LyricsRequest,
    audio_file: UploadFile = None):
    try:
        audio_path = audio_file.filename if audio_file else None
        song_req = SongRequest()
        if audio_file:
            audio_path = f"/tmp/{audio_file.filename}"
            with open(audio_path, "wb") as f:
                f.write(await audio_file.read())
            # song_req.audio_file_path = audio_path

        song_req.style = lyrics_req.style

        final_song_path = generator_service.generate_song_from_lyrics_and_humming(
            lyrics_req=lyrics_req,
            song_req=song_req,
            audio_path=audio_path
        )
        return {
            "lyrics": lyrics_req.theme,
            "final_song_path": final_song_path
        }

    except Exception as e:
        logging.error(f"Error generating content: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

