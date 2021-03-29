from typing import Optional, List
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import psycopg2

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

class SignupSuccess(BaseModel):
    status: str

class Form(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: str
    company: str
    password: str


@app.get("/")
def read_root():
    return 'Welcome To Authentication Server'


@app.post("/login", response_model=AuthInfo)
async def read_item(credentials: Creds):
    creds = credentials.dict()
    success= False


    con = psycopg2.connect(
        host = "15.206.153.123",
        database="postgres",
        user="postgres",
        password="mysecretpassword"
    )
    cur = con.cursor()
    query="select first_name from customer where email='"+creds["username"]+"' and password='"+creds["password"]+"'"
    cur.execute(query)
    rows=cur.fetchall()

    if len(rows):
        success = True
        username = rows[0][0]

    cur.close
    con.close()
    
    if success:
        return {"username": username, "userType": "customer", "authToken": "abcxyz", "authenticated": True}
    else:
        raise HTTPException(status_code=401, detail="Not Allowed")

@app.post("/signup", response_model=SignupSuccess)
async def create_item(formdata: Form):
    form = formdata.dict()

    con = psycopg2.connect(
        host = "15.206.153.123",
        database="postgres",
        user="postgres",
        password="mysecretpassword"
    )
    cur = con.cursor()  
    c_first_name=form['first_name']
    c_last_name=form['last_name']
    c_email=form['email']
    c_company=form['company']
    c_password=form['password']
    sql=f"INSERT INTO customer (first_name, last_name, email, company, password ) VALUES ('{c_first_name}','{c_last_name}', '{c_email}', '{c_company}','{c_password}')"
    print(sql)
    cur.execute(sql)
    con.commit()
    cur.close
    con.close()

    return {"status": "signup successfull"}
    #raise HTTPException(status_code=401, detail="Not Allowed")
