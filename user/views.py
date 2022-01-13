from django.shortcuts import render
from django.contrib.auth import login, logout
from .mixins import *
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from .serializer import *
# Create your views here.


class LoginApiView(ObtainAuthToken):
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(
            user=user)
        login(request, user)

        return Response({'token': token.key, 'user': UserSerializer(user, context={'request': request}).data}, status.HTTP_200_OK)


class CheckTokenApiView(AuthticationMixin, APIView):
    def post(self, request, *args, **kwargs):
        token = self.token
        user = token.user
        return Response({'token': token.key, 'user': UserSerializer(user).data})


class SignupApiView(CreateAPIView):
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        token, created = Token.objects.get_or_create(user=user)
        login(request, user)

        return Response({'token': token.key, 'user': UserSerializer(user, context={'request': request}).data}, status.HTTP_200_OK)


class ClientViewSet(AuthticationMixin, viewsets.ModelViewSet):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()
    filter_backends = [SearchFilter]
    search_fields = ['first_name',
                     'last_name', 'email', 'company']
