from django.urls import path
from core.views import product, login, basket, checkout, sign_up, \
    BonuseListView,IndexTemplateView

urlpatterns = [
    path('', IndexTemplateView.as_view(), name='index'),
    path('sign_up/', sign_up, name='sign_up'),
    path('bonuses/', BonuseListView.as_view(), name="bonuses")
]
