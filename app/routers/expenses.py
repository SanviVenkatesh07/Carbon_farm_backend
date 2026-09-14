from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Expense
from ..schemas import ExpenseIn

router = APIRouter(prefix="/api/expenses", tags=["Expenses"])

@router.get("/{user_id}")
def expenses(user_id: int, db: Session = Depends(get_db)):
    rows = db.query(Expense).filter(Expense.user_id == user_id).order_by(Expense.id.desc()).all()
    total = sum(r.amount for r in rows)
    return {"ok": True, "total": total, "expenses": [r.__dict__ for r in rows]}

@router.post("/{user_id}")
def add_expense(user_id: int, data: ExpenseIn, db: Session = Depends(get_db)):
    e = Expense(user_id=user_id, **data.model_dump())
    db.add(e); db.commit(); db.refresh(e)
    return {"ok": True, "expense": e.__dict__}
