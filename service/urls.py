from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('ticket', TicketViewSet, 'ticket')
router.register('advance', AdvanceViewSet, 'advance')
router.register('detail', ServiceViewset, 'service')


urlpatterns = [
    path('add', TicketCreateApiView.as_view()),
    path('finish/<int:id>', FinishProjectView.as_view()),
    path('close/<int:id>', CloseProjectView.as_view()),
    path('report', ReportApiView.as_view()),
    path('clientTicket/<int:id>', ClientTicketsLisApiView.as_view()),
    path('', include(router.urls)),

]
