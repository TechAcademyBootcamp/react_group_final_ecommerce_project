from django.db import models
from django.utils.translation import ugettext_lazy as _


class Category(models.Model):
    title = models.CharField(_('Title'), max_length=40)
    parent_category = models.ForeignKey('self', verbose_name=_('Parent Category'), related_name='sub_categories', on_delete=models.CASCADE, null=True, blank=True)

    # moderations
    order = models.PositiveIntegerField(_('Order'), default=1)
    is_published = models.BooleanField(_('is published'), default=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('Category')
        verbose_name_plural = _('Categories')
        ordering = ('order', '-created_at',)

    def __str__(self):
        if self.parent_category:
            return f"{self.id}. {self.title} Parent: {self.parent_category}"
        else:
            return f"{self.id}. {self.title}"


class Product(models.Model):
    title = models.CharField(_('Title'), max_length=40)
    category = models.ForeignKey(Category, verbose_name=_('Category'), related_name='products', on_delete=models.CASCADE)
    code = models.PositiveIntegerField(_('Code'), )
    price = models.DecimalField(_('Price'), max_digits=7, decimal_places=2)
    properties = models.ManyToManyField('PropertyValue', through='ProductProperties', related_name='products')

    # moderations
    order = models.PositiveIntegerField(_('Order'), default=1)
    is_published = models.BooleanField(_('is published'), default=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('Product')
        verbose_name_plural = _('Products')
        ordering = ('order', '-created_at',)

    def __str__(self):
        return self.title


class ProductImage(models.Model):
    image = models.ImageField(_('Image'), upload_to='product_images')
    is_main = models.BooleanField(_('Is main'), default=False)
    product = models.ForeignKey(Product, verbose_name=_('Product'), on_delete=models.CASCADE, related_name='product_images')

    # moderations
    order = models.PositiveIntegerField(_('Order'), default=1)
    is_published = models.BooleanField(_('is published'), default=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('Product Image')
        verbose_name_plural = _('Product Images')
        ordering = ('order', '-created_at',)

    def __str__(self):
        return self.product


class PropertyName(models.Model):
    title = models.CharField(_('Title'), max_length=40)
    SHOW_OPTION_CHOICES = (
        ('select_color', 'Select Color'),
        ('select_text', 'Select text'),
        ('select_option', 'Select option'),
        ('radio_button', 'Radio button'),
    )
    show_option = models.CharField(_('Show option'), choices=SHOW_OPTION_CHOICES, max_length=15)
    category = models.ManyToManyField(Category, verbose_name=_('Category'), related_name='property_names')

    # moderations
    order = models.PositiveIntegerField(_('Order'), default=1)
    is_published = models.BooleanField(_('is published'), default=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('Property name')
        verbose_name_plural = _('Property names')
        ordering = ('order', '-created_at',)

    def __str__(self):
        return self.title


class PropertyValue(models.Model):
    title = models.CharField(_('Title'), max_length=40)
    property_name = models.ForeignKey(PropertyName, verbose_name=_('Property Name'), on_delete=models.CASCADE, related_name='property_values')

    # moderations
    order = models.PositiveIntegerField(_('Order'), default=1)
    is_published = models.BooleanField(_('is published'), default=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('Property Value')
        verbose_name_plural = _('Property Values')
        ordering = ('order', '-created_at',)

    def __str__(self):
        return self.title


class ProductProperties(models.Model):
    product = models.ForeignKey(Product, verbose_name=_('Product'), on_delete=models.CASCADE, related_name='product_properties',)
    property_value = models.ForeignKey(PropertyValue, verbose_name=_('Property Value'), on_delete=models.CASCADE, related_name='product_properties',)
    in_stock = models.BooleanField(_('In Stock'), default=True)

    # moderators
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('Product Properties')
        verbose_name_plural = _('Product Properties')
    
    def __str__(self):
        return f"Product: {self.product}, Property: {self.property_value}"

class ProductDiscount(models.Model):
    CHOICES_DISCOUNT = (
        ('1', _('Faiz')),
        ('2', _('Manat')),
    )
    products = models.ManyToManyField(Product, verbose_name=_('Product Discounts'), related_name='product_discounts',)
    compaign = models.CharField(_('Compaign'), max_length=120)
    discount_type = models.BooleanField(_('Discount Type'),choices=CHOICES_DISCOUNT)
    discount_amount = models.DecimalField(_('Discount Amount'),max_digits=7, decimal_places=2)
    deadline = models.DateTimeField(_('Deadline'),)
    is_active = models.BooleanField(_('Is Active'), default=True)

    # moderators
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('Product Discount')
        verbose_name_plural = _('Product Discounties')
    
    def __str__(self):
        return f"Compaign: {self.compaign}, Discount Amount: {self.discount_amount}"

class Bonuse(models.Model):
    title = models.CharField(_('Title'), max_length=20)
    image = models.FileField(upload_to='bonuse')
    description = models.TextField(_('Description'))
    bonuse = models.IntegerField(_('Bonuse'), default=5)

    # moderators
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('Bonuse')
        verbose_name_plural = _('Bonuses')
        ordering = ('created_at',)

    def __str__(self):
        return self.title
