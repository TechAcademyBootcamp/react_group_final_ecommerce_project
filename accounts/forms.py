from django import forms
from django.contrib.auth import get_user_model

User = get_user_model()


class AccountForm(forms.ModelForm):
    class Meta:
        model = User
        fields = '__all__'