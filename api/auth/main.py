from typing import Optional, List
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Creds(BaseModel):
    username: str
    password: str

class AuthInfo(BaseModel):
    username: str
    userType: str
    authToken: str
    authenticated: bool

@app.get("/")
def read_root():
    return 'Welcome To Authentication Server'


@app.post("/login", response_model=AuthInfo)
async def read_item(credentials: Creds):
    creds = credentials.dict()
    if creds["username"] != "okalisha98@gmail.com":
        raise HTTPException(status_code=401, detail="Not Allowed")
    return {"username": "alisha", "userType": "customer", "authToken": "abcxyz", "authenticated": True}
