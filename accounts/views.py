from django.shortcuts import render, redirect
from django.views.generic import UpdateView
from accounts.forms import AccountForm
from django.contrib import messages



# def account(request):
#     return render(request,'account.html')

# Create your views here.

class AccountView(UpdateView):
    form_class = AccountForm
    # model = Account
    # fields = '__all__'
    template_name = 'account.html'
    success_url = '/account'

    def get_object(self):
        return self.request.user

    def form_valid(self, *args, **kwargs):
        print('OK')
        messages.success(self.request, 'Changes have been successfully saved.')
        return super().form_valid(*args, **kwargs)

    #  def get_context_data(self,*args, **kwargs):
    #     messages.success(request, 'Changes have been successfully saved.')
    #     context = super().get_context_data(*args, **kwargs)
    #     return context
    

# def account(request):
#     if request.method == 'POST':
#         form = AccountForm(data=request)
#         if form.is_valid():
#             form.save()
#             messages.success(request,'Changes have been successfully saved.')
#             return redirect('/account')
#     else:

#         form = AccountForm()
#     context = {
#         'form' : form,
#     }
#     return render(request,'account.html', context)