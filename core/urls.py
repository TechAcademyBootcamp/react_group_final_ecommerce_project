from django.urls import path
from core.views import index,product

urlpatterns = [
    path('', index, name='home'),
    path('product/', product, name='product'),
]