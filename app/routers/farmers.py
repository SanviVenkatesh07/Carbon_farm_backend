from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Farmer
from ..schemas import FarmerIn

router = APIRouter(prefix="/api/farmers", tags=["Farmers"])

@router.get("/{user_id}")
def get_farmer(user_id: int, db: Session = Depends(get_db)):
    f = db.query(Farmer).filter(Farmer.user_id == user_id).first()
    return {"ok": True, "farmer": f.__dict__ if f else None}

@router.post("/{user_id}")
def save_farmer(user_id: int, data: FarmerIn, db: Session = Depends(get_db)):
    f = db.query(Farmer).filter(Farmer.user_id == user_id).first()
    if not f:
        f = Farmer(user_id=user_id)
        db.add(f)
    for k, v in data.model_dump().items():
        setattr(f, k, v)
    db.commit(); db.refresh(f)
    return {"ok": True, "farmer": f.__dict__}
