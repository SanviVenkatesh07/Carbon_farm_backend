from fastapi import APIRouter

router = APIRouter(prefix="/api/guidance", tags=["Guidance"])

GUIDES = {
    "tomato": ["Use well-drained soil.", "Irrigate according to soil moisture.", "Watch for early blight and fruit borer.", "Avoid unnecessary nitrogen application."],
    "onion": ["Keep beds well drained.", "Use balanced nutrients.", "Avoid over-irrigation near harvest.", "Monitor thrips regularly."],
    "maize": ["Use soil-test-based fertilizer.", "Keep irrigation consistent during key growth stages.", "Scout for fall armyworm.", "Maintain crop residue where practical."],
    "ragi": ["Use suitable local varieties.", "Avoid waterlogging.", "Use organic matter to improve soil health.", "Monitor weeds early."],
}

@router.get("/{crop}")
def guidance(crop: str):
    key = crop.lower().strip()
    return {"ok": True, "crop": crop, "tips": GUIDES.get(key, [
        "Check soil moisture before irrigation.",
        "Use soil-test-based fertilizer decisions.",
        "Monitor pests regularly.",
        "Keep records of farm inputs and harvests."
    ])}
