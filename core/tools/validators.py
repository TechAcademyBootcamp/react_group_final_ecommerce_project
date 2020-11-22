import re
from django.utils.translation import ugettext_lazy as _
from django.core.exceptions import ValidationError

def phone_number_validator(value):
    pattern = re.compile(r'^\+?1?\d{9,15}$', re.IGNORECASE)
    if not pattern.match(value):
        raise ValidationError(_("Phone number must be entered in the format: '+999999999'. Up to 9 digits allowed."))
    return True

def expiry_date_validator(value):
    r = re.compile('^([0-9][0-9])/([0-9][0-9])$')
    m = r.match(value)
    if m == None:
        raise ValidationError(_('Must be in the format MM/YY. i.e. "11/22" for Nov 2022.'))
    
    year = int(m.groups()[1])
    curr_year = datetime.datetime.now().year % 100
    max_year = curr_year + 10
    if year > max_year or year < curr_year:
        raise ValidationError(_('Year must be in the range %s - %s.' % (str(curr_year).zfill(2), str(max_year).zfill(2),)))
    if int(value.split('/')[0]) > 12 and value.split('/')[0] == '00':
        raise ValidationError(_('Please add valid expire date'))
    return value

def ValidateLuhnChecksum(number_as_string):
    """ checks to make sure that the card passes a luhn mod-10 checksum """
    sum = 0
    num_digits = len(number_as_string)
    oddeven = num_digits & 1
    for i in range(0, num_digits):
        digit = int(number_as_string[i])
        if not (( i & 1 ) ^ oddeven ):
            digit = digit * 2
        if digit > 9:
            digit = digit - 9
        sum = sum + digit
        
    return ( (sum % 10) == 0 )

def ValidateCharacters(number):
    """ Checks to make sure string only contains valid characters """
    return re.compile('^[0-9 ]*$').match(number) != None
        
def StripToNumbers(number):
    """ remove spaces from the number """
    if ValidateCharacters(number):
        result = ''
        rx = re.compile('^[0-9]$')
        for d in number:
            if rx.match(d):
                result += d
        return result
    else:
        raise ValidationError('Number has invalid digits')
    
def credit_card_validator(value):
    if not ValidateCharacters(value):
        raise ValidationError('Can only contain numbers and spaces.')
    value = StripToNumbers(value)
    if not ValidateLuhnChecksum(value):
        raise ValidationError('Not a valid credit card number.')
    return value