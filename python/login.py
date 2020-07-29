from __main__ import app
from flask import request, jsonify
from mongo import User
import bcrypt
import jwt
import os

@app.route('/login', methods=["POST"])
def login():
    email = request.json.get("email")
    password = request.json.get("password")
    
    # check password
    user = User.objects(email=email.lower()).first()
    hashed_password = user.password
    valid_password = bcrypt.checkpw(password.encode('utf8'), hashed_password.encode('utf8'))

    if(valid_password):
        token = jwt.encode({'email': user.email}, os.environ['JWT_SECRET'], algorithm='HS256')
        return jsonify({ "email": user.email, "token": token.decode("utf-8") })
    else:
        return jsonify({ "status": "fail" })

