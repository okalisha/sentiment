import mail
import json
from redis import Redis
import pandas as pd
from pickle import load
from helper import convert_label


redis = Redis(host='localhost', port=6379, db=0)

MODEL_PATH =  '../modelling/model_svc'
VECTORIZER_PATH = '../modelling/vectorizer'

while True:
    data = json.loads(redis.blpop("uploads")[1].decode("utf-8"))
    clf = load(open(MODEL_PATH, 'rb'))
    cv = load(open(VECTORIZER_PATH, 'rb'))
    file_path = "../data/uploads/" + data['file_name']
    dataframe = pd.read_csv(file_path)
    data_vector = cv.fit_transform(dataframe.iloc[:,0]).toarray()
    predictions = clf.predict(data_vector)
    result = dataframe.merge(pd.DataFrame(predictions), left_index=True, right_index=True, how='inner')
    result.columns = ['Review', 'Prediction']
    result['Prediction'] = result.apply(lambda x: convert_label(x['Prediction']), axis=1)
    result.to_csv(file_path, index=False)
    mail.send_email(data['email'], data['file_name']
)
    print('email sent')