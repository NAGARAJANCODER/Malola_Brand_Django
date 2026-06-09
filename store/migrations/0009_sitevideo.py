from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0008_review_order_rating'),
    ]

    operations = [
        migrations.CreateModel(
            name='SiteVideo',
            fields=[
                ('id',         models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title',      models.CharField(blank=True, help_text='Optional caption shown in admin', max_length=200)),
                ('video',      models.FileField(upload_to='site_videos/')),
                ('is_active',  models.BooleanField(default=True)),
                ('sort_order', models.IntegerField(default=0, help_text='Lower number shown first')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['sort_order', '-created_at'],
            },
        ),
    ]
