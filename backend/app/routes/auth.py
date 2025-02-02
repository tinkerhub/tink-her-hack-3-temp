from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from passlib.context import CryptContext

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

users = []  # In-memory storage

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

@router.post("/register")
def register(user: UserCreate):
    for u in users:
        if u["email"] == user.email:
            raise HTTPException(status_code=400, detail="Email already exists")

    hashed_password = pwd_context.hash(user.password)
    new_user = {"name": user.name, "email": user.email, "password": hashed_password}
    users.append(new_user)
    return {"message": "User registered successfully"}

@router.post("/login")
def login():
    return {"message": "Login endpoint (To be implemented)"}
