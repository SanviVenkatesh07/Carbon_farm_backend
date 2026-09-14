from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/api/carbon", tags=["Carbon"])

class CarbonIn(BaseModel):
    area: float = 0
    soil_practice: str = ""
    irrigation: str = ""
    fertilizer: str = ""
    residue: str = ""

@router.post("/readiness")
def readiness(data: CarbonIn):
    score = 0
    reasons = []
    if data.area > 0:
        score += 20
    if data.soil_practice.lower() in {"organic", "mulching", "cover crop", "reduced tillage"}:
        score += 25
    if data.irrigation:
        score += 15
    if data.fertilizer:
        score += 15
    if data.residue.lower() in {"retained", "mulched", "composted"}:
        score += 25
    score = min(score, 100)

    if score >= 70:
        level = "Good readiness"
    elif score >= 40:
        level = "Getting ready"
    else:
        level = "Needs more records"

    return {"ok": True, "score": score, "level": level, "reasons": reasons}
