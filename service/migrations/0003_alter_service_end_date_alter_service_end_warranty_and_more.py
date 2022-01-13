# Generated by Django 4.0 on 2022-01-06 18:05

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='service',
            name='end_date',
            field=models.DateTimeField(default=datetime.datetime(2022, 1, 6, 13, 5, 35, 366712), verbose_name='Fecha de entrega'),
        ),
        migrations.AlterField(
            model_name='service',
            name='end_warranty',
            field=models.DateTimeField(default=datetime.datetime(2022, 1, 6, 13, 5, 35, 366712), verbose_name='Fin de garantía'),
        ),
        migrations.AlterField(
            model_name='service',
            name='finish_date',
            field=models.DateTimeField(blank=True, null=True, verbose_name='Fecha de finalización'),
        ),
        migrations.AlterField(
            model_name='service',
            name='start_date',
            field=models.DateTimeField(default=datetime.datetime(2022, 1, 6, 13, 5, 35, 366712), verbose_name='Fecha de inicio'),
        ),
        migrations.AlterField(
            model_name='service',
            name='start_warranty',
            field=models.DateTimeField(default=datetime.datetime(2022, 1, 6, 13, 5, 35, 366712), verbose_name='Inicio de garantía'),
        ),
    ]
