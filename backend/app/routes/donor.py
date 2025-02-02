from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()
donors = []  # In-memory storage

class DonorCreate(BaseModel):
    name: str
    age: int
    contact: str

@router.post("/register")
def register_donor(donor: DonorCreate):
    donors.append(donor.dict())
    return {"message": "Donor registered successfully", "donor": donor}
