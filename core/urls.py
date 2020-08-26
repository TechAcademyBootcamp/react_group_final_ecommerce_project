from django.urls import path
from core.views import index,product,login

urlpatterns = [
    path('', index, name='home'),
    path('product/', product, name='product'),
    path('login/', login, name='login'),
]
