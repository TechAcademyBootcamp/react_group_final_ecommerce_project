from django.shortcuts import render
from django.views.generic import CreateView
from accounts.forms import AccountForm



# def account(request):
#     return render(request,'account.html')

# Create your views here.

class AccountView(CreateView):
    form_class = AccountForm
    # model = Account
    # fields = '__all__'
    template_name = 'account.html'

