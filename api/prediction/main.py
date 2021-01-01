from typing import Optional, List
from fastapi import FastAPI, File, UploadFile, Form
from pickle import load
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

class Items(BaseModel):
    items: list = []

class Prediction(BaseModel):
    text: str
    prediction: str
    score: str

class Predictions(BaseModel):
    predictions: List[Prediction] 


MODEL_PATH =  '../../modelling/model'
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
        predicted_class = 'POSITIVE' if predictions[i] == 1 else 'NEGATIVE' 
        result.append({'text': data['items'][i], 'prediction': predicted_class, 'score':''})
    return {'predictions': result}


@app.post("/upload")
async def create_upload_file(file: UploadFile = File(...)):
    contents = await file.read()
    with open(f'uploads/{file.filename}', 'wb') as f:
        f.write(contents)
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
    print('alisha')
    return {"response": "success", "new_id": model_id}