#! /usr/bin/python3 

from flask import Flask
from mongo import *

app = Flask(__name__)

@app.route('/', methods=["GET"])
def hello():
    return 'Hello, World!'

import login
import register
import auth

if __name__ == '__main__':
    app.run()
