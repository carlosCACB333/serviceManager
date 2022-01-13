
from django.contrib import admin
from django.urls import path, include
from .wiews import IndexListView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('user.urls')),
    path('api/service/', include('service.urls')),
    path('', IndexListView.as_view(), name='index'),



]
