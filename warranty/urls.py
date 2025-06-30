from django.urls import path
from .views import login, submit_registration, register_warranty

urlpatterns = [
    path('login/', login, name='login'),
    path('submitRegistration/', submit_registration, name='submit_registration'),
    path('registerWarranty/', register_warranty, name='register_warranty'),
]
