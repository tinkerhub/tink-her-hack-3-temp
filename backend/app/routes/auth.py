from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt

# FastAPI Router for Authentication
router = APIRouter()

# Password Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# In-memory storage (Temporary, use a database in production)
users = []

# JWT Token Settings
SECRET_KEY = "your_secret_key_here"  # Replace with a strong secret key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # Token expires in 30 minutes

# Pydantic Models
class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Utility Functions
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Generates a JWT access token."""
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_password(plain_password, hashed_password):
    """Verifies if a password matches its hashed version."""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    """Hashes the password."""
    return pwd_context.hash(password)

# Routes

@router.post("/register")
def register(user: UserCreate):
    """Registers a new user."""
    for u in users:
        if u["email"] == user.email:
            raise HTTPException(status_code=400, detail="Email already exists")

    hashed_password = get_password_hash(user.password)
    new_user = {"name": user.name, "email": user.email, "password": hashed_password}
    users.append(new_user)
    return {"message": "User registered successfully"}

@router.post("/login")
def login(user: UserLogin):
    """Logs in a user and returns a JWT token."""
    for u in users:
        if u["email"] == user.email and verify_password(user.password, u["password"]):
            # Create JWT Token
            access_token = create_access_token(data={"sub": user.email}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
            return {"access_token": access_token, "token_type": "bearer"}
    
    raise HTTPException(status_code=400, detail="Invalid email or password")
