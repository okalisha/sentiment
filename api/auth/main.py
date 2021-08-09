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
    email: str
    password: str

class AuthInfo(BaseModel):
    username: str
    userType: str
    authToken: str
    authenticated: bool
    customer_id: int
    email: str

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
    query="select first_name, customer_id, email from customer where email='"+creds["email"]+"' and password='"+creds["password"]+"'"
    cur.execute(query)
    rows=cur.fetchall()

    if len(rows):
        success = True
        username = rows[0][0]
        customer_id = rows[0][1]
        email = rows[0][2]

    cur.close
    con.close()
    
    if success:
        return {"username": username, "userType": "customer", "authToken": "abcxyz", "authenticated": True, "customer_id": customer_id, "email": email}
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


@app.get("/usage/{customer_id}")
async def get_usage(customer_id: int):

    con = psycopg2.connect(
        host = "15.206.153.123",
        database="postgres",
        user="postgres",
        password="mysecretpassword"
    )  

    cur = con.cursor(cursor_factory=psycopg2.extras.DictCursor) 
    summary_query=f"select sum(instance_count) as total, sum(negative_comments) as negative, sum(positive_comments) as positive from usage where customer_id = '{customer_id}'"
    yearly_query=f"""select EXTRACT(month from datetime) as month_number, EXTRACT(year from datetime) as year, LEFT(TO_CHAR(datetime, 'Month'), 3) as month, sum(instance_count) as total, sum(negative_comments) as negative,  sum(positive_comments) as positive from usage where customer_id = '{customer_id}' group by month_number, month, year order by month_number"""
    recent_query=f"""select * from usage where customer_id = '{customer_id}' order by datetime desc limit 5"""
    cur.execute(summary_query)
    summary=cur.fetchall()
    cur.execute(yearly_query)
    yearly=cur.fetchall()
    cur.execute(recent_query)
    recent=cur.fetchall()
    
    # get summary for each year
    years = []
    for row in yearly:
        years.append(row['year'])
        sorted(years)
    years = list(set(years))
    yearly_dict = {}
    for year in years:
        yearly_dict[int(year)] = {
            "months": [row['month'] for row in yearly if row['year'] == year],
            "counts": {
                "positive": [row['positive'] for row in yearly if row['year'] == year],
                "negative": [row['negative'] for row in yearly if row['year'] == year],
                "total": [row['total'] for row in yearly if row['year'] == year],
            }
        }

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
        "yearly": yearly_dict,
        "recent":[{
            "request_id": row["request_id"],
            "time": str(row["datetime"]),
            "reviews": row["instance_count"],
            "positive": row["positive_comments"],
            "negative": row["negative_comments"],
            "request_type": row["request_type"],
            "delivery_method": row["delivery_method"],
        } for row in recent]
    }
    
    cur.close
    con.close()

    return result
