from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User
from ..schemas import SignupIn, LoginIn

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/signup")
def signup(data: SignupIn, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.phone == data.phone).first()
    if existing:
        return {"ok": False, "message": "An account with this phone number already exists."}
    user = User(name=data.name, phone=data.phone, password=data.password, language=data.language)
    db.add(user); db.commit(); db.refresh(user)
    return {"ok": True, "user": {"id": user.id, "name": user.name, "phone": user.phone, "language": user.language}}

@router.post("/login")
def login(data: LoginIn, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.phone == data.phone, User.password == data.password).first()
    if not user:
        return {"ok": False, "message": "Invalid phone number or password."}
    return {"ok": True, "user": {"id": user.id, "name": user.name, "phone": user.phone, "language": user.language}}

@router.get("/user/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return {"ok": False}
    return {"ok": True, "user": {"id": user.id, "name": user.name, "phone": user.phone, "language": user.language}}
