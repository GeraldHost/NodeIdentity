import os
import datetime
from mongoengine import connect, Document, StringField, DateTimeField

client = connect(host=os.environ["MONGO_URL"])
client.server_info()

class User(Document):
    email = StringField(unique=True)
    password = StringField()
    date_modified = DateTimeField(default=datetime.datetime.utcnow)

