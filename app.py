import os
import json
from flask_cors import CORS, cross_origin
from werkzeug.security import generate_password_hash
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173"], supports_credentials=True)

@app.route('/')
def home():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'message': 'Missing username or password'}), 400
    username = data['username']
    password = data['password']
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
    return jsonify({'message': f'User {username} registered successfully!'}), 200

@app.route('/submitRegistration', methods=['POST', 'OPTIONS'])
@cross_origin(origin=["http://localhost:5173", "http://127.0.0.1:5173"], supports_credentials=True)
def submit_registration():
    if request.method == 'OPTIONS':
        return '', 204
    data = request.get_json()
    # Check for required fields from React
    required_fields = ['firstName', 'lastName', 'email', 'password']
    if not data or not all(field in data and data[field] for field in required_fields):
        return jsonify({'message': 'Missing required registration fields'}), 400
    user_data = {
        "first_name": data['firstName'],
        "last_name": data['lastName'],
        "email": data['email'],
        "address": data.get('address', ''),
        "password": generate_password_hash(data['password'])
    }
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
    return jsonify({'message': f"User {data['email']} registered successfully!"}), 200

if __name__ == '__main__':
    app.run(debug=True)