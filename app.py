from flask import Flask, render_template, request
from werkzeug.security import generate_password_hash
import json
import os

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    hashed_password = generate_password_hash(password)
    user_data = {"username": username, "password": hashed_password}
    users_file = 'users.json'
    if os.path.exists(users_file):
        with open(users_file, 'r') as f:
            try:
                users = json.load(f)
            except json.JSONDecodeError:
                users = []
    else:
        users = []
    users.append(user_data)
    with open(users_file, 'w') as f:
        json.dump(users, f, indent=4)
    print(f"Username: {username}, Password (hashed): {hashed_password}")
    return f"User {username} registered successfully!"

if __name__ == '__main__':
    app.run(debug=True)