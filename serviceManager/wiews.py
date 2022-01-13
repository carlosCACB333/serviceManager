
from django.views.generic import View
from django.views.generic.base import TemplateView


class IndexListView(TemplateView):
    template_name = "index.html"
