from flask import Flask, render_template, request, session, redirect, url_for
from werkzeug.security import generate_password_hash
import json
import os

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'  # Replace with a strong secret key

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
    # Store username and hashed_password in session
    session['username'] = username
    session['password'] = hashed_password
    return redirect(url_for('warranty_reg'))

@app.route('/warrantyReg')
def warranty_reg():
    # Only allow access if user is logged in
    if 'username' not in session or 'password' not in session:
        return redirect(url_for('home'))
    return render_template('warrantyReg.html')

@app.route('/warranty', methods=['POST'])
def warranty():
    # Get username and password from session
    username = session.get('username')
    password = session.get('password')
    # Collect warranty fields from the form
    product = request.form.get('product')
    serial_number = request.form.get('serial_number')
    purchase_date = request.form.get('purchase_date')
    warranty_period = request.form.get('warranty_period')
    additional_info = request.form.get('additional_info')

    # Prepare warranty data
    warranty_data = {
        "username": username,
        "product": product,
        "serial_number": serial_number,
        "purchase_date": purchase_date,
        "warranty_period": warranty_period,
        "additional_info": additional_info
    }
    warranty_file = 'warranties.json'
    if os.path.exists(warranty_file):
        with open(warranty_file, 'r') as f:
            try:
                warranties = json.load(f)
            except json.JSONDecodeError:
                warranties = []
    else:
        warranties = []
    warranties.append(warranty_data)
    with open(warranty_file, 'w') as f:
        json.dump(warranties, f, indent=4)
    print(f"Warranty info stored for user: {username}")
    return "Warranty information submitted successfully!"

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/submitRegistration', methods=['POST'])
def submit_registration():
    # Get form data
    first_name = request.form.get('firstName')
    last_name = request.form.get('lastName')
    email = request.form.get('email')
    address = request.form.get('address')
    password = request.form.get('password')
    confirm_password = request.form.get('confirmPassword')

    # Simple password confirmation check
    if password != confirm_password:
        return "Passwords do not match!", 400

    # Hash the password
    hashed_password = generate_password_hash(password)

    # Prepare user data
    user_data = {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "address": address,
        "password": hashed_password
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
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)