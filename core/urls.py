from django.urls import path
from core.views import index,product,login,basket,checkout,sign_up

urlpatterns = [
    path('', index, name='home'),
    path('product/', product, name='product'),
    path('login/', login, name='login'),
    path('basket/', basket, name='basket'),
    path('checkout/', checkout, name='checkout'),
    path('sign_up/', sign_up, name='sign_up'),
]
