from django.contrib import admin
from core.models import Category, PropertyValue, PropertyName, ProductImage, Product, ProductProperties, Bonuse

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'parent_category')

# admin.site.register(Category)
admin.site.register([ProductProperties, PropertyName, PropertyValue, ProductImage, Product, Bonuse])
