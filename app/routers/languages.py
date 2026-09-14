from fastapi import APIRouter

router = APIRouter(prefix="/api/languages", tags=["Languages"])

@router.get("")
def languages():
    return {
        "languages": [
            {"code": "en", "name": "English"},
            {"code": "kn", "name": "ಕನ್ನಡ"},
            {"code": "hi", "name": "हिन्दी"},
            {"code": "ta", "name": "தமிழ்"},
            {"code": "te", "name": "తెలుగు"},
        ]
    }
