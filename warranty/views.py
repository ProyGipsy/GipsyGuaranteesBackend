from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .models import Warranty
import json

# Create your views here.

@csrf_exempt
def login(request):
    if request.method != 'POST':
        return JsonResponse({'message': 'Only POST allowed'}, status=405)
    try:
        data = json.loads(request.body)
    except Exception:
        return JsonResponse({'message': 'Invalid JSON'}, status=400)
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return JsonResponse({'message': 'Missing username or password'}, status=400)
    user = authenticate(username=username, password=password)
    if user is not None:
        return JsonResponse({'message': f'User {username} logged in successfully!'})
    else:
        return JsonResponse({'message': 'Invalid credentials'}, status=401)

@csrf_exempt
@require_POST
def submit_registration(request):
    try:
        data = json.loads(request.body)
    except Exception:
        return JsonResponse({'message': 'Invalid JSON'}, status=400)
    required_fields = ['firstName', 'lastName', 'email', 'password']
    if not data or not all(field in data and data[field] for field in required_fields):
        return JsonResponse({'message': 'Missing required registration fields'}, status=400)
    # Check if user already exists by email
    if User.objects.filter(email=data['email']).exists():
        return JsonResponse({'message': 'User with this email already exists'}, status=400)
    # Create new user
    user = User.objects.create(
        username=data['email'],
        first_name=data['firstName'],
        last_name=data['lastName'],
        email=data['email'],
        password=make_password(data['password'])
    )
    return JsonResponse({'message': f"User {data['email']} registered successfully!"}, status=200)

@csrf_exempt
@require_POST
def register_warranty(request):
    try:
        data = json.loads(request.body)
    except Exception:
        return JsonResponse({'message': 'Invalid JSON'}, status=400)
    required_fields = ['username', 'product', 'serial_number', 'purchase_date']
    if not data or not all(field in data and data[field] for field in required_fields):
        return JsonResponse({'message': 'Missing required warranty fields'}, status=400)
    try:
        user = User.objects.get(username=data['username'])
    except User.DoesNotExist:
        return JsonResponse({'message': 'User does not exist'}, status=404)
    warranty = Warranty.objects.create(
        user=user,
        product=data['product'],
        serial_number=data['serial_number'],
        purchase_date=data['purchase_date']
    )
    return JsonResponse({'message': 'Warranty registered successfully!'}, status=201)
