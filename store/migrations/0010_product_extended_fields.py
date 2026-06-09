from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [('store', '0009_sitevideo')]

    operations = [
        migrations.AddField(model_name='product', name='short_description',    field=models.CharField(blank=True, max_length=300)),
        migrations.AddField(model_name='product', name='brand',                field=models.CharField(blank=True, max_length=100)),
        migrations.AddField(model_name='product', name='sku',                  field=models.CharField(blank=True, max_length=100)),
        migrations.AddField(model_name='product', name='discount_price',       field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
        migrations.AddField(model_name='product', name='stock_quantity',       field=models.IntegerField(default=0)),
        migrations.AddField(model_name='product', name='package_size',         field=models.CharField(blank=True, max_length=100)),
        migrations.AddField(model_name='product', name='country_of_origin',    field=models.CharField(blank=True, default='India', max_length=100)),
        migrations.AddField(model_name='product', name='shelf_life',           field=models.CharField(blank=True, max_length=100)),
        migrations.AddField(model_name='product', name='storage_instructions', field=models.TextField(blank=True)),
        migrations.AddField(model_name='product', name='manufacturer_details', field=models.TextField(blank=True)),
        migrations.AddField(model_name='product', name='nut_sugar',            field=models.CharField(blank=True, max_length=50, verbose_name='Sugar')),
        migrations.AddField(model_name='product', name='nut_sodium',           field=models.CharField(blank=True, max_length=50, verbose_name='Sodium')),
        migrations.AddField(model_name='product', name='recipe_name',          field=models.CharField(blank=True, max_length=200)),
        migrations.AddField(model_name='product', name='recipe_prep_time',     field=models.CharField(blank=True, max_length=50)),
        migrations.AddField(model_name='product', name='recipe_cook_time',     field=models.CharField(blank=True, max_length=50)),
        migrations.AddField(model_name='product', name='recipe_servings',      field=models.CharField(blank=True, max_length=50)),
        migrations.AddField(model_name='product', name='recipe_ingredients',   field=models.TextField(blank=True)),
        migrations.AddField(model_name='product', name='recipe_instructions',  field=models.TextField(blank=True)),
        migrations.AddField(model_name='product', name='recipe_image',         field=models.ImageField(blank=True, null=True, upload_to='products/recipes/')),
        migrations.AddField(model_name='product', name='recipe_video_url',     field=models.URLField(blank=True)),
        migrations.AddField(model_name='product', name='health_benefits',      field=models.TextField(blank=True, help_text='One benefit per line')),
        migrations.AddField(model_name='product', name='cert_organic',         field=models.BooleanField(default=False)),
        migrations.AddField(model_name='product', name='cert_non_gmo',         field=models.BooleanField(default=False)),
        migrations.AddField(model_name='product', name='cert_vegan',           field=models.BooleanField(default=False)),
        migrations.AddField(model_name='product', name='cert_halal',           field=models.BooleanField(default=False)),
        migrations.AddField(model_name='product', name='cert_iso',             field=models.BooleanField(default=False)),
        migrations.AddField(model_name='product', name='seo_title',            field=models.CharField(blank=True, max_length=200)),
        migrations.AddField(model_name='product', name='seo_description',      field=models.TextField(blank=True)),
        migrations.AddField(model_name='product', name='seo_keywords',         field=models.CharField(blank=True, max_length=500)),
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='products/gallery/')),
                ('sort_order', models.IntegerField(default=0)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='gallery_images', to='store.product')),
            ],
            options={'ordering': ['sort_order', 'id']},
        ),
    ]
