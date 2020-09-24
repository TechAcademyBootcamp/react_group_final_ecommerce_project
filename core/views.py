from django.shortcuts import render

# Create your views here.

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
