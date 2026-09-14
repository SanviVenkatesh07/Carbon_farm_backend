from fastapi import APIRouter
from ..schemas import ChatIn

router = APIRouter(prefix="/api/chatbot", tags=["Chatbot"])

def reply(message: str):
    m = message.lower()
    if "market" in m or "price" in m:
        return "I can show the demo market-price list. Prices are marked as demo until a live provider is connected."
    if "carbon" in m:
        return "Carbon readiness improves when you keep farm records and use practices such as mulching, cover crops, residue management and efficient irrigation."
    if "water" in m or "irrigation" in m:
        return "Check soil moisture before irrigating and avoid unnecessary watering. Crop and soil type should guide the schedule."
    if "fertilizer" in m:
        return "Prefer soil-test-based fertilizer decisions and record what you apply."
    if "pest" in m:
        return "Scout crops regularly and identify the pest before choosing a control method."
    return "I can help with crops, irrigation, fertilizers, pests, market prices, farm records and carbon-credit readiness."

@router.post("")
def chatbot(data: ChatIn):
    return {"ok": True, "reply": reply(data.message), "language": data.language}
