from fastapi import FastAPI
from app.routes import auth, donor, organisation

app = FastAPI()

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(donor.router, prefix="/donor", tags=["Donor"])
app.include_router(organisation.router, prefix="/organisation", tags=["Organisation"])

@app.get("/")
def home():
    return {"message": "Welcome to the FastAPI Backend (No Database)"}
