from django.contrib.auth import get_user_model
from django.contrib.auth import login
from .mixins import *
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, UpdateAPIView
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


class ClientRatingApiView(AuthticationMixin, APIView):

    def post(self, request, id, *args, **kwargs):
        rating = request.data['rating']
        client = Client.objects.get(id=id)
        client.score = rating
        client.save()
        return Response(ClientSerializer(client).data)


class UserViewSet(AuthticationMixin, AdminPermissionMixin, viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        try:
            instance.delete()
        except models.deletion.ProtectedError:
            return Response({'msg': 'No se puede eliminar este usuario porque tiene boletas registradas'}, status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_204_NO_CONTENT)


class ToogleActiveUserView(AuthticationMixin, APIView):
    def post(self, request, id, *args, **kwargs):
        user = get_user_model().objects.filter(id=id).first()
        user.is_active = not user.is_active
        user.save()
        return Response({'id': user.id, 'is_active': user.is_active})


class ProfileUpdateApiView(UpdateAPIView):
    serializer_class = ProfileUpdateSerializer
    queryset = User.objects.all()


class ChangePassApiView(AuthticationMixin, APIView):
    serializer_class = ChangePasswordSerializer
    queryset = User.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        # return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

        user = self.token.user
        if not user.check_password(serializer.validated_data.get('password')):
            return Response({"password": ["Contraseña antigua incorrecta."]}, status.HTTP_400_BAD_REQUEST)

        user.set_password(serializer.validated_data.get('password1'))
        user.save()
        return Response({'msg': 'Actualizado'})
