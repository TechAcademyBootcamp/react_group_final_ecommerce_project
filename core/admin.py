from django.contrib import admin
from core.models import Category,Product,ProductImage,ProductProperties,PropertyName,PropertyValue

# Register your models here.

admin.site.register(Category)
admin.site.register([Product,PropertyValue,PropertyName,ProductProperties,ProductImage])