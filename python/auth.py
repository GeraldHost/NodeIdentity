from __main__ import app

@app.route("/auth", methods=["GET"])
def auth():
    return "Auth route"
