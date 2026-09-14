from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Farm
from ..schemas import FarmIn

router = APIRouter(prefix="/api/farms", tags=["Farms"])

@router.get("/{user_id}")
def list_farms(user_id: int, db: Session = Depends(get_db)):
    farms = db.query(Farm).filter(Farm.user_id == user_id).all()
    return {"ok": True, "farms": [f.__dict__ for f in farms]}

@router.post("/{user_id}")
def add_farm(user_id: int, data: FarmIn, db: Session = Depends(get_db)):
    farm = Farm(user_id=user_id, **data.model_dump())
    db.add(farm); db.commit(); db.refresh(farm)
    return {"ok": True, "farm": farm.__dict__}
