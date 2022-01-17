from pyexpat import model
from django.db import models
from django.contrib.auth.models import PermissionsMixin, AbstractUser


# Create your models here.

class User(AbstractUser, PermissionsMixin):

    class Types(models.TextChoices):
        Admin = 'Admin', 'Administrador'
        Seller = 'Seller', 'Vendedor'

    rol = models.CharField("Cargo", max_length=10,
                           choices=Types.choices, default=Types.Seller)

    REQUIRED_FIELDS = ('first_name',
                       'last_name', 'email', 'rol')

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'


class Client(models.Model):
    first_name = models.CharField('Nombres', max_length=150, )
    last_name = models.CharField('Apellidos', max_length=150, )
    address = models.CharField(
        "Direccion", max_length=150, blank=True, null=True)
    reference = models.CharField(
        'Referencia', max_length=150, blank=True, null=True)
    email = models.EmailField('Email', blank=True, null=True)
    company = models.CharField(
        'Empresa', max_length=150, blank=True, null=True)
    phone = models.CharField("Teléfono", max_length=15,  blank=True, null=True)
    score = models.PositiveIntegerField("Calificación", default=50)

    def __str__(self):
        return self.first_name+' '+self.last_name

    class Meta:
        verbose_name = 'Cliente'
        verbose_name_plural = 'Clientes'
        unique_together = ('first_name', 'last_name')
