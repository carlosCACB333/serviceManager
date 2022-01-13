
from django.db.models.aggregates import Count, Sum
from django.db.models import F
from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from user.mixins import AuthticationMixin
from user.models import Client, User
from .serializers import *
from .models import *
from django.db.models.functions import ExtractMonth
from dateutil.relativedelta import relativedelta


class TicketCreateApiView(AuthticationMixin, APIView):
    def post(self, request, *args, **kwargs):

        client_data = request.data.pop('client')
        service_data = request.data.pop('services')
        payment_data = request.data.pop('payments')
        ticket_data = request.data
        print('**********')
        print(service_data)

        user = self.token.user

        client_id = client_data.get('id', None)
        if client_id:
            client = Client.objects.filter(id=client_id).first()
            if not client:
                return Response({'non_field_errors': 'El cliente no existe'}, status.HTTP_404_NOT_FOUND)
        else:
            # create client
            serializer_cli = ClientSerializer(data=client_data)
            serializer_cli.is_valid()
            if serializer_cli.is_valid():
                client = serializer_cli.save()
            else:
                return Response({'client': serializer_cli.errors}, status.HTTP_400_BAD_REQUEST)

        # create ticket
        ticket = Ticket.objects.create(**ticket_data, user=user, client=client)

        for service in service_data:
            # create ser
            serializer_serv = ServiceSerializer(
                data={**service, 'ticket': ticket.id})
            if serializer_serv.is_valid():
                serializer_serv.save()
            else:
                ticket.delete()
                client.delete()
                return Response({'services': serializer_serv.errors}, status.HTTP_400_BAD_REQUEST)

        self.create_payment(payment_data, ticket)

        return Response(TicketSerializer(ticket).data)

    def create_payment(self, payment_data, ticket):
        payment_serializer = PaymentSerializer(
            data={**payment_data, 'ticket': ticket.id})
        if payment_serializer.is_valid():
            payment = payment_serializer.save()


class ClientTicketsLisApiView(AuthticationMixin, ListAPIView):
    serializer_class = TicketSerializer

    def get_queryset(self):
        id = self.kwargs['id']
        return Ticket.objects.filter(client__id=id)


class TicketViewSet(AuthticationMixin, viewsets.ModelViewSet):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all().order_by('-date')
    filter_backends = [SearchFilter]
    search_fields = ['client__first_name',
                     'client__last_name', 'client__email']


class AdvanceViewSet(AuthticationMixin, viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    queryset = Payment.objects.all()


class ServiceViewset(AuthticationMixin, viewsets.ModelViewSet):
    serializer_class = ServiceSerializer
    queryset = Service.objects.all()


class ReportApiView(AuthticationMixin, APIView):
    def get(self, *args, **kwargs):
        clients = Client.objects.all().count()
        tickets = Ticket.objects.all().count()
        users = User.objects.all().count()
        services = Service.objects.all().count()
        # cantidad de ventas  por mes
        print('**************')
        sales = Ticket.objects.annotate(
            month=ExtractMonth('date')).values('month').annotate(count=Count('id')).values('count', 'month')
        ticket_count = {entry['month']: entry['count']
                        for entry in sales}
        # ganacias
        takings = Ticket.objects.annotate(month=ExtractMonth('date')).values('month').annotate(
            sum=Sum(F('service__cost')*F('service__amount'))).values('month', 'sum')

        sales_sum = takings.aggregate(total=Sum('sum'))
        takings = {taking['month']: taking['sum'] for taking in takings}
        # Proximas entregas de proyectos
        tickets_due = Ticket.objects.all().order_by('end_date')[:5]

        # total cancelado
        canceled_total = Ticket.objects.aggregate(
            total=Sum('payment__amount'))
        print(canceled_total)

        return Response(
            {'clients': clients, 'tickets': tickets, 'users': users, 'services': services, 'ticket_count': ticket_count, 'takings': takings, 'tickets_due': TicketSerializer(tickets_due, many=True).data, 'sales_total': sales_sum['total'], 'canceled_total': canceled_total['total']})


class FinishProjectView(AuthticationMixin, APIView):

    def post(self, request, id, *args, **kwargs):
        ticket = Ticket.objects.filter(id=id).first()
        if not ticket:
            return Response({'msg': 'No encontrado'}, status.HTTP_400_BAD_REQUEST)
        ticket.finish_date = datetime.now()
        ticket.start_warranty = datetime.now()
        ticket.end_warranty = datetime.now()+relativedelta(years=1)
        ticket.save()
        return Response({'ticket': TicketSerializer(ticket).data})


class CloseProjectView(AuthticationMixin, APIView):

    def post(self, request, id, *args, **kwargs):
        ticket = Ticket.objects.filter(id=id).first()
        if not ticket:
            return Response({'msg': 'No encontrado'}, status.HTTP_400_BAD_REQUEST)
        ticket.is_closed = True
        ticket.save()
        return Response({'ticket': TicketSerializer(ticket).data})
