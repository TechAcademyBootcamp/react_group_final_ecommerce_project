from django.shortcuts import render,redirect
from django.views.generic import ListView
from django.contrib.auth.forms import UserCreationForm
from .forms import CreateUserForm
from django.contrib import messages
from django.contrib.auth import authenticate,login as auth_login,logout
from django.contrib.auth.decorators import login_required   
from core.models import Bonuse


def index(request):
    return render(request,'index.html')

def product(request):
    return render(request,'product.html')



def logoutUser(request):
    logout(request)
    return redirect('login')
@login_required(login_url='login')

def basket(request):
    return render(request ,'basket.html')

def checkout(request):
    return render(request ,'checkout.html')

def sign_up(request):
    if request.user.is_authenticated:
        return redirect('home')
    else:
        form=CreateUserForm()

        if request.method=='POST':
            form=CreateUserForm(request.POST)
            if form.is_valid():
                form.save()
                user=form.cleaned_data.get('username')
                messages.success(request,'Account was created for' + user)
                return redirect('login')



        context={'form':form}
        return render(request ,'sign_up.html',context)

def login(request):
    if request.user.is_authenticated:
        return redirect('home')
    else:
        if request.method=='POST':
            print(request.POST)
            username=request.POST.get('username')
            password=request.POST.get('password')
            user=authenticate(request,username=username,password=password)
            if user is not None:
                auth_login(request,user)
                return redirect('home')
            else:
                messages.info(request,'Email or password is incorrect')


        return render(request,'login.html')

# def bonuses(request):
#     return render(request, 'membership_card.html')


class BonuseListView(ListView):
    model = Bonuse
    template_name = 'membership_card.html'
