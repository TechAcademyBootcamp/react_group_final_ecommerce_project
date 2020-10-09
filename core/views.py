from django.shortcuts import render
from django.views.generic import ListView

from core.models import Bonuse


def index(request):
    return render(request,'index.html')

def product(request):
    return render(request,'product.html')

def login(request):
    return render(request,'login.html')


def basket(request):
    return render(request ,'basket.html')

def checkout(request):
    return render(request ,'checkout.html')

def sign_up(request):
    return render(request ,'sign_up.html')

# def bonuses(request):
#     return render(request, 'membership_card.html')


class BonuseListView(ListView):
    model = Bonuse
    template_name = 'membership_card.html'
