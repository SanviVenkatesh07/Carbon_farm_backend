from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Record
from ..schemas import RecordIn

router = APIRouter(prefix="/api/records", tags=["Records"])

@router.get("/{user_id}")
def records(user_id: int, db: Session = Depends(get_db)):
    rows = db.query(Record).filter(Record.user_id == user_id).order_by(Record.id.desc()).all()
    return {"ok": True, "records": [r.__dict__ for r in rows]}

@router.post("/{user_id}")
def add_record(user_id: int, data: RecordIn, db: Session = Depends(get_db)):
    r = Record(user_id=user_id, **data.model_dump())
    db.add(r); db.commit(); db.refresh(r)
    return {"ok": True, "record": r.__dict__}
