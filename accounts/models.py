from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from core.tools.validators import phone_number_validator, credit_card_validator


class User(AbstractUser):
    GENDER_CHOICES = (
        (0, _('Cinsiyyətinizi seçin' )),
        (1, _('Kişi')),
        (2, _('Qadın')),
    )
    gender = models.IntegerField(_('Gender'), null=True, blank=True, choices=GENDER_CHOICES, default=0)
    address = models.CharField(_('Address'), max_length=100, null=True, blank=True)
    birthday = models.DateField(_('Birthday'), null=True, blank=True)
    phone_number = models.CharField(_('Phone number'), null=True, blank=True, max_length=15, validators=(phone_number_validator,))
    card_number = models.CharField(_('Card number'), null=True, blank=True, max_length=20, validators=(credit_card_validator,))


   