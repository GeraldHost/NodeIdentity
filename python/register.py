from __main__ import app
from flask import request, jsonify
from mongo import User
import bcrypt

@app.route('/register', methods=["POST"])
def register():
    email = request.json.get("email")
    password = request.json.get("password")
    
    # hash password
    hashed_password = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())
    user = User(email=email.lower(), password=hashed_password).save()

    return jsonify({ "email": user.email })
