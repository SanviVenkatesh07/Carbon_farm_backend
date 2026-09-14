from sqlalchemy import Column, Integer, String, Float, Boolean, Text
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    phone = Column(String(30), unique=True, nullable=False)
    password = Column(String(200), nullable=False)
    language = Column(String(30), default="English")

class Farmer(Base):
    __tablename__ = "farmers"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, nullable=False)
    village = Column(String(120), default="")
    district = Column(String(120), default="")
    state = Column(String(120), default="Karnataka")

class Farm(Base):
    __tablename__ = "farms"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, nullable=False)
    name = Column(String(120), default="My Farm")
    crop = Column(String(120), default="")
    area = Column(Float, default=0)
    irrigation = Column(String(120), default="")
    soil = Column(String(120), default="")

class MarketPrice(Base):
    __tablename__ = "market_prices"
    id = Column(Integer, primary_key=True)
    commodity = Column(String(100), nullable=False)
    market = Column(String(120), nullable=False)
    state = Column(String(100), nullable=False)
    unit = Column(String(50), default="quintal")
    price = Column(Float, nullable=False)
    source = Column(String(100), default="demo")
    is_live = Column(Boolean, default=False)

class Record(Base):
    __tablename__ = "records"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, nullable=False)
    title = Column(String(160), nullable=False)
    details = Column(Text, default="")
    category = Column(String(80), default="Farm")

class Expense(Base):
    __tablename__ = "expenses"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, nullable=False)
    item = Column(String(160), nullable=False)
    amount = Column(Float, nullable=False)
    category = Column(String(80), default="Other")
