from pydantic import BaseModel, Field

class SignupIn(BaseModel):
    name: str
    phone: str
    password: str
    language: str = "English"

class LoginIn(BaseModel):
    phone: str
    password: str

class FarmIn(BaseModel):
    name: str = "My Farm"
    crop: str = ""
    area: float = Field(default=0, ge=0)
    irrigation: str = ""
    soil: str = ""

class FarmerIn(BaseModel):
    village: str = ""
    district: str = ""
    state: str = "Karnataka"

class RecordIn(BaseModel):
    title: str
    details: str = ""
    category: str = "Farm"

class ExpenseIn(BaseModel):
    item: str
    amount: float = Field(ge=0)
    category: str = "Other"

class ChatIn(BaseModel):
    message: str
    language: str = "English"
