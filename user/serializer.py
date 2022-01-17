
from rest_framework import serializers
from django.contrib.auth import password_validation
from .models import *


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        label='Password', required=False,)

    def create(serlf, validated_data):
        user = User(**validated_data)
        user.set_password(user.password)
        user.save()
        return user

    def update(self, instance, validated_data):

        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)
        return super().update(instance, validated_data)

    class Meta:
        model = User
        fields = ('username', 'password', 'first_name',
                  'last_name', 'email', 'id', 'last_login', 'is_active', 'date_joined', 'rol')
        write_only_fields = (
            "password",
        )

        read_only_fields = ('last_login', 'date_joined')

    def validate_password(self, password):
        password_validation.validate_password(password, self.instance)
        return password


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'


class ProfileUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'password', 'first_name',
                  'last_name', 'email', 'id', 'last_login', 'is_active', 'date_joined', 'rol')
        read_only_fields = ('last_login', 'date_joined',
                            'password', 'is_active', 'rol')


class ChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        label="Password",
        style={"input_type": "password"},
        trim_whitespace=False,
        write_only=True,
        required=True,
    )
    password1 = serializers.CharField(
        label="Password1",
        style={"input_type": "password"},
        trim_whitespace=False,
        write_only=True,
        required=True,
    )
    password2 = serializers.CharField(
        label="Password2",
        style={"input_type": "password"},
        trim_whitespace=False,
        write_only=True,
        required=True,
    )

    def validate_password1(self, password1):
        password_validation.validate_password(password1, self.instance)
        return password1

    def validate(self, attrs):
        # password = attrs.get("password")
        password1 = attrs.get("password1")
        password2 = attrs.get("password2")
        if password1 != password2:
            error = {
                "password1": [
                    "Las contraseñas no coinciden",
                ],
                "password2": [
                    "Las contraseñas no coinciden",
                ],
            }
            raise serializers.ValidationError(error)
        return attrs
