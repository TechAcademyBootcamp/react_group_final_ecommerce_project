from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm
from accounts.models import User
from django import forms

# class OrderForm(ModelForm):
#     class Meta:
#         model=Order
#         fields='__all__'


class CreateUserForm(UserCreationForm):
    class Meta:
        model=User
        fields=['username','last_name','email','phone_number','password1','password2']