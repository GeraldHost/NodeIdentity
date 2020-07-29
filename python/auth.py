from __main__ import app
import os
import jwt
from flask import request, jsonify

@app.route("/auth", methods=["GET"])
def auth():
    token = request.args.get("token")
    payload = jwt.decode(token, os.environ["JWT_SECRET"], algorithms=['HS256'])
    return jsonify({ "user": payload })
