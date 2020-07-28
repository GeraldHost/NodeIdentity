from __main__ import app

@app.route('/register', methods=["POST"])
def register():
    return 'Register Route'
