from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.http import JsonResponse
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
