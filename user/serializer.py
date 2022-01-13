

from rest_framework import serializers
from django.contrib.auth import password_validation
from .models import *


class UserSerializer(serializers.ModelSerializer):

    def create(serlf, validated_data):
        user = User(**validated_data)
        user.set_password(user.password)
        user.save()
        return user

    class Meta:
        model = User
        fields = ('username', 'password', 'first_name',
                  'last_name', 'email', 'id')
        write_only_fields = (
            "password",
        )

    def validate_password(self, password):
        password_validation.validate_password(password, self.instance)
        return password


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'
