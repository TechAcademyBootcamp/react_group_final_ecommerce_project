from django.urls import path
from core.views import index, product, login, basket, checkout, sign_up,logoutUser, \
    BonuseListView

urlpatterns = [
    path('', index, name='home'),
    path('product/', product, name='product'),
    path('login/', login, name='login'),
    path('logout/', logoutUser, name='logout'),
    path('basket/', basket, name='basket'),
    path('checkout/', checkout, name='checkout'),
    path('sign_up/', sign_up, name='sign_up'),
    path('bonuses/', BonuseListView.as_view(), name="bonuses")
]
