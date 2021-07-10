from typing import Optional, List
from fastapi import FastAPI, File, UploadFile, Form
from pickle import load
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from redis import Redis
import json
import psycopg2

app = FastAPI()
redis = Redis(host='localhost', port=6379, db=0)

origins = [
    "http://localhost",
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

class Items(BaseModel):
    items: list = []
    customer_id: str  
    #request_type: str
    #instance_count: str
    #positive_comments: str
    #negative_comments: str
    #status: str
    #delivery_method: str         
     
class Prediction(BaseModel):
    text: str
    prediction: str
    score: str
    

class Predictions(BaseModel):
    predictions: List[Prediction] 


MODEL_PATH =  '../../modelling/model_svc'
VECTORIZER_PATH = '../../modelling/vectorizer'

clf = load(open(MODEL_PATH, 'rb'))
cv = load(open(VECTORIZER_PATH, 'rb'))


@app.get("/")
def read_root():
    return 'Welcome To Prediction Server'


@app.post("/predict", response_model=Predictions )
async def read_item(items: Items):
    result = []
    data = items.dict()
    print (data)
    data_vector = cv.transform(data['items']).toarray()
    predictions = clf.predict(data_vector)
    for i in range(len(predictions)):
        if predictions[i] == 1:
            predicted_class="Positive"
        else:
            predicted_class ="Negative"
        # predicted_class = 'POSITIVE' if predictions[i] == 1 else 'NEGATIVE' 

        result.append(
            {
                'text': data['items'][i], 
                'prediction': predicted_class, 
                'score':'',
                
            }
        )
    answer = "prediction"
    values = [a_dict[answer] for a_dict in result]
    a=values.count("Positive")
    b=values.count("Negative")
    con = psycopg2.connect(
        host = "15.206.153.123",
        database="postgres",
        user="postgres",
        password="mysecretpassword"
)
      
    cur = con.cursor()  
    customer_id=data["customer_id"]
    request_type="API"
    instance_count=str(len(predictions))
    positive_comments=str(a)
    negative_comments=str(b)
    status="Successful"
    delivery_method="Real Time"
    sql="INSERT INTO usage (customer_id,request_type,instance_count,positive_comments,negative_comments,status,delivery_method ) Values ('" + customer_id + "','" + request_type + "','" + instance_count + "','" + positive_comments + "','" + negative_comments + "','" + status + "','" + delivery_method + "')"
    print(sql)
    cur.execute(sql)
    con.commit()
    cur.close
    con.close()
    return {'predictions': result}


@app.post("/upload")
async def create_upload_file(file: UploadFile = File(...), email: str = Form(...)):
    contents = await file.read()
    path = f'../../data/uploads/{file.filename}'
    with open(path, 'wb') as f:
        f.write(contents)
        redis.lpush('uploads', json.dumps({"email": email, "file_name": file.filename}))
        
    return {"filename": file.filename}


@app.get("/model")
async def get_model_info():
    return {"id": 123, "version": '20201231_2345', "algorithm": "Naive Bayes", "accuracy": 0.73 }


@app.post("/model/{model_id}")
async def switch_model(model_id: int):
    global clf
    if model_id == 1:
        clf = load(open('../../modelling/model_svc', 'rb'))
    if model_id == 2:
        clf = load(open('../../modelling/model_nvb', 'rb'))
    return {"response": "success", "new_id": model_id}