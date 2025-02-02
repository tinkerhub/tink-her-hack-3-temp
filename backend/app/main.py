from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, donor, organisation

app = FastAPI()

# CORS Middleware Configuration (Allow React Frontend to Access API)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers (e.g., Authorization, Content-Type)
)

# Include API routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(donor.router, prefix="/donor", tags=["Donor"])
app.include_router(organisation.router, prefix="/organisation", tags=["Organisation"])

# Test Endpoint to check if backend is running
@app.get("/")
def home():
    return {"message": "Welcome to the FastAPI Backend (No Database)"}
