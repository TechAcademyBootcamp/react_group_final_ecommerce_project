from django import forms
from django.contrib.auth import get_user_model
# from accounts.models  import User
User = get_user_model()


class AccountForm(forms.ModelForm):
    
   
    
    # gender = forms.ChoiceField(choices=User.GENDER_CHOICES, initial=0, required=False, widget=forms.Select(attrs={
    #         'id': 'id_gender',

    #         }))
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'gender', 'birthday', 'phone_number', 'email', 'card_number', 'address')
        
        widgets = {
            'first_name' : forms.TextInput(attrs={
                'id': 'id_first_name',
                'placeholder': 'Adınızı daxil edin'
            }),

            'last_name': forms.TextInput(attrs={
                'id': 'id_last_name',
                'placeholder': 'Soyadınızı daxil edin'
            }),

            'gender': forms.Select(attrs={
                'id': 'id_gender',
                'placeholder': 'Cinsiyyətinizi seçin'

            }),

            'birthday': forms.DateInput(attrs={
                'id': 'id_birthday',
                'placeholder': 'Gün/Ay/İl'

            }),

            'phone_number': forms.NumberInput(attrs={
                'id':'id_phone',
                'placeholder': '050 123 45 67'

            }),
            
            'email': forms.EmailInput(attrs={
                'id': 'id_email',
                'placeholder': 'hello@gmail.com'
            }),

            'card_number': forms.TextInput(attrs={
                'id': 'id_cinici_card',
                'placeholder': '0000 0000 0000 0000'
            }),

            'address': forms.TextInput(attrs={
                'id': 'id_place',
                'placeholder': 'Bakı, Cəfər xəndan,40'
            })


        }