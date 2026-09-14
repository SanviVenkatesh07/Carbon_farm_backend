from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Farm, Record, Expense

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])

@router.get("/{user_id}")
def dashboard(user_id: int, db: Session = Depends(get_db)):
    farms = db.query(Farm).filter(Farm.user_id == user_id).all()
    records = db.query(Record).filter(Record.user_id == user_id).count()
    expenses = db.query(Expense).filter(Expense.user_id == user_id).all()
    return {
        "ok": True,
        "farm_count": len(farms),
        "record_count": records,
        "expense_total": sum(e.amount for e in expenses),
        "farms": [{"name": f.name, "crop": f.crop, "area": f.area} for f in farms],
    }
