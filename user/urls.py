from django.urls import path, include
from rest_framework import routers
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('client', ClientViewSet, 'client')

urlpatterns = [
    path('login', LoginApiView.as_view()),
    path('checkToken', CheckTokenApiView.as_view()),
    path('signup', SignupApiView.as_view()),
    path('', include(router.urls)),

]
