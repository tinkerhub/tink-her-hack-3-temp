from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()
organisations = []  # In-memory storage

class OrganisationCreate(BaseModel):
    name: str
    description: str
    contact: str

@router.post("/register")
def register_organisation(org: OrganisationCreate):
    organisations.append(org.dict())
    return {"message": "Organisation registered successfully", "organisation": org}

@router.get("/")
def get_organisations():
    return {"organisations": organisations}
