from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import MarketPrice

router = APIRouter(prefix="/api/market", tags=["Market"])

@router.get("/prices")
def prices(db: Session = Depends(get_db)):
    rows = db.query(MarketPrice).order_by(MarketPrice.commodity).all()
    return {"ok": True, "demo": True, "prices": [
        {
            "commodity": r.commodity, "market": r.market, "state": r.state,
            "unit": r.unit, "price": r.price, "source": r.source, "is_live": r.is_live
        } for r in rows
    ]}
