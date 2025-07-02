from django.urls import path
from .views import login, submit_registration, register_warranty, change_password, forgot_password

urlpatterns = [
    path('login/', login, name='login'),
    path('submitRegistration/', submit_registration, name='submit_registration'),
    path('registerWarranty/', register_warranty, name='register_warranty'),
    path('changePassword/', change_password, name='change_password'),
    path('forgotPassword/', forgot_password, name='forgot_password'),
]
