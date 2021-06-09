from typing import Optional, List
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import psycopg2.extras

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:3001",
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


@app.get("/usage")
async def get_usage():

    con = psycopg2.connect(
        host = "15.206.153.123",
        database="postgres",
        user="postgres",
        password="mysecretpassword"
    )  

    cur = con.cursor(cursor_factory=psycopg2.extras.DictCursor) 
    customer_id = 4
    summary_query=f"select sum(instance_count) as total, sum(negative_comments) as negative, sum(positive_comments) as positive from usage where customer_id = '{customer_id}'"
    monthly_query=f"""select EXTRACT(month from datetime) as month_number, LEFT(TO_CHAR(datetime, 'Month'), 3) as month, sum(instance_count) as total, sum(negative_comments) as negative,  sum(positive_comments) as positive from usage where customer_id = '{customer_id}' group by month_number, month order by month_number"""
    recent_query=f"""select * from usage where customer_id = '{customer_id}' order by request_id desc limit 5"""
    cur.execute(summary_query)
    summary=cur.fetchall()
    cur.execute(monthly_query)
    monthly=cur.fetchall()
    cur.execute(recent_query)
    recent=cur.fetchall()
    
    result = {
        "customer_id": customer_id,
        "summary": {
            "total": summary[0]['total'],
            "positive": summary[0]['positive'],
            "negative": summary[0]['negative'],
        },
        "overall": {
            "positive_percentage": round(summary[0]['positive']/summary[0]['total'], 2)*100,
            "negative_percentage": round(summary[0]['negative']/summary[0]['total'], 2)*100,
        },
        "monthly": {
            "months": [row['month'] for row in monthly],
            "counts": {
                "positive": [row['positive'] for row in monthly],
                "negative": [row['negative'] for row in monthly],
                "total": [row['total'] for row in monthly],
            },
        },
        "recent":[{
            "time": str(row["datetime"]),
            "reviews": row["instance_count"],
            "positive": row["positive_comments"],
            "negative": row["negative_comments"],
            "request_type": row["request_type"],
        } for row in recent]
    }
    
    cur.close
    con.close()

    return result
