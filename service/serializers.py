
from rest_framework import serializers
from .models import *
from user.serializer import ClientSerializer, UserSerializer


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'


class TicketSerializer(serializers.ModelSerializer):
    client = ClientSerializer()
    user = UserSerializer()
    services = ServiceSerializer(source='service_set', many=True)
    payments = PaymentSerializer(source='payment_set', many=True)

    class Meta:
        model = Ticket
        fields = '__all__'
        read_only_fields = ('date',)


class TicketOfMonthSerializer(serializers.Serializer):
    count = serializers.IntegerField()
    month = serializers.IntegerField()
