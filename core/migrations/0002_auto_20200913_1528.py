# Generated by Django 3.1 on 2020-09-13 11:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=40, verbose_name='Title')),
                ('code', models.PositiveIntegerField(verbose_name='Code')),
                ('price', models.DecimalField(decimal_places=2, max_digits=7, verbose_name='Price')),
                ('order', models.PositiveIntegerField(default=1, verbose_name='Order')),
                ('is_published', models.BooleanField(default=True, verbose_name='is published')),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products', to='core.category', verbose_name='Category')),
            ],
            options={
                'verbose_name': 'Product',
                'verbose_name_plural': 'Products',
                'ordering': ('order', '-created_at'),
            },
        ),
        migrations.CreateModel(
            name='PropertyName',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=40, verbose_name='Title')),
                ('show_option', models.CharField(choices=[('select_color', 'Select Color'), ('select_text', 'Select text'), ('select_option', 'Select option'), ('radio_button', 'Radio button')], max_length=15, verbose_name='Show option')),
                ('order', models.PositiveIntegerField(default=1, verbose_name='Order')),
                ('is_published', models.BooleanField(default=True, verbose_name='is published')),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('category', models.ManyToManyField(related_name='property_names', to='core.Product', verbose_name='Product')),
            ],
            options={
                'verbose_name': 'Property name',
                'verbose_name_plural': 'Property names',
                'ordering': ('order', '-created_at'),
            },
        ),
        migrations.CreateModel(
            name='PropertyValue',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=40, verbose_name='Title')),
                ('order', models.PositiveIntegerField(default=1, verbose_name='Order')),
                ('is_published', models.BooleanField(default=True, verbose_name='is published')),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('property_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='property_values', to='core.propertyname', verbose_name='Property Name')),
            ],
            options={
                'verbose_name': 'Property name',
                'verbose_name_plural': 'Property names',
                'ordering': ('order', '-created_at'),
            },
        ),
        migrations.CreateModel(
            name='ProductProperties',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('in_stock', models.BooleanField(default=True, verbose_name='In Stock')),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_properties', to='core.product', verbose_name='Product')),
                ('property_value', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_properties', to='core.propertyvalue', verbose_name='Property Value')),
            ],
            options={
                'verbose_name': 'ProductProperties',
                'verbose_name_plural': 'ProductProperties',
            },
        ),
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='product_images', verbose_name='Image')),
                ('is_main', models.BooleanField(default=False, verbose_name='Is main')),
                ('order', models.PositiveIntegerField(default=1, verbose_name='Order')),
                ('is_published', models.BooleanField(default=True, verbose_name='is published')),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_images', to='core.product', verbose_name='Product')),
            ],
            options={
                'verbose_name': 'Product Image',
                'verbose_name_plural': 'Product Images',
                'ordering': ('order', '-created_at'),
            },
        ),
        migrations.AddField(
            model_name='product',
            name='properties',
            field=models.ManyToManyField(related_name='products', through='core.ProductProperties', to='core.PropertyValue'),
        ),
    ]
