from django.contrib import admin
from core.models import Category, PropertyValue, PropertyName, ProductImage, Product, ProductProperties

admin.site.register(Category)
admin.site.register([ProductProperties, PropertyName, PropertyValue, ProductImage, Product])