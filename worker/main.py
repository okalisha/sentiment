import mail
import json
from redis import Redis

redis = Redis(host='localhost', port=6379, db=0)

while True:
    data = json.loads(redis.blpop("uploads")[1].decode("utf-8"))
    file_path = "/Users/alisha/sentiment/api/prediction/" + data['path']
    mail.send_email(data['email'], file_path)
    print('email sent')