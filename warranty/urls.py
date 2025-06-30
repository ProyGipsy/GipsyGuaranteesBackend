from django.urls import path
from .views import login, submit_registration

urlpatterns = [
    path('login/', login, name='login'),
    path('submitRegistration/', submit_registration, name='submit_registration'),
]
