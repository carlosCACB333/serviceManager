from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from .wiews import IndexListView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("user.urls")),
    path("api/service/", include("service.urls")),
    path("", IndexListView.as_view(), name="index"),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
