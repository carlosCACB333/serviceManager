from django.db import models
from django.conf import settings
from datetime import datetime


class Ticket(models.Model):
    client = models.ForeignKey(
        "user.Client", verbose_name='Cliente', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             verbose_name='Usuario', on_delete=models.PROTECT)

    is_closed = models.BooleanField("Cerrado", default=False)

    date = models.DateTimeField(
        'Fecha de contrato', auto_now=False, auto_now_add=True)

    end_date = models.DateTimeField(
        "Fecha de entrega", default=datetime.now())

    finish_date = models.DateTimeField(
        "Fecha de finalización", null=True)
    start_warranty = models.DateTimeField(
        "Inicio de garantía", null=True)
    end_warranty = models.DateTimeField(
        "Fin de garantía", null=True)

    def __str__(self):
        return str(self.client)

    class Meta:
        verbose_name = 'ticket'
        verbose_name_plural = 'Tickets'


class Service (models.Model):
    name = models.CharField("Nombre", max_length=50)
    size = models.CharField('Medida', max_length=150, blank=True, null=True)
    address = models.CharField(
        'Dirección', max_length=150, blank=True, null=True)
    description = models.TextField("Descripción", blank=True, null=True)
    cost = models.DecimalField(
        "costo", max_digits=10, decimal_places=2)
    amount = models.PositiveIntegerField('Cantidad', default=1)
    ticket = models.ForeignKey(
        "service.Ticket", verbose_name='Boleta', on_delete=models.CASCADE)

    # def save(self,  **kwargs):
    #     if self.end_warranty and not self.start_warranty:
    #         self.start_warranty = datetime.now()
    #     super(Service, self).save(**kwargs)

    class Meta:
        verbose_name = 'Service'
        verbose_name_plural = 'Services'


class Payment(models.Model):
    amount = models.DecimalField('Cantidad', max_digits=10, decimal_places=2)
    date = models.DateTimeField("Fecha", auto_now=False, auto_now_add=True)
    detail = models.TextField("Detalle", blank=True, null=True)
    ticket = models.ForeignKey(
        "service.Ticket", verbose_name='Boleta', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Payment'
        verbose_name_plural = 'Payments'
