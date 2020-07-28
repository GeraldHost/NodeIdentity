from __main__ import app

@app.route('/login', methods=["POST"])
def login():
    return 'Login Route'

