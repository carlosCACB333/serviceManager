from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('client', ClientViewSet, 'client')
router.register('user', UserViewSet, 'user')

urlpatterns = [
    path('login', LoginApiView.as_view()),
    path('checkToken', CheckTokenApiView.as_view()),
    path('signup', SignupApiView.as_view()),
    path("rating/<int:id>", ClientRatingApiView.as_view()),
    path("toogleActive/<int:id>", ToogleActiveUserView.as_view()),
    path("profile/<int:pk>", ProfileUpdateApiView.as_view()),
    path("changePassword", ChangePassApiView.as_view()),
    path('', include(router.urls)),
]
