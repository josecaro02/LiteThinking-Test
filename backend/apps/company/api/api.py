from rest_framework.generics import ListCreateAPIView, UpdateAPIView, DestroyAPIView
from apps.company.models import company
from apps.company.api.serializers import CompanySerializer
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status

class CompanyAPIView(ListCreateAPIView):
    serializer_class = CompanySerializer

    def get_queryset(self):
        queryset = company.objects.all()
        return queryset

    def post(self, request):
        company_data = request.data
        serializer = CompanySerializer(data = company_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class CompanyPutAPIView(UpdateAPIView):
    serializer_class = CompanySerializer

    def put(self, request, id):
        try:
            company_finded = company.objects.get(id = id)
        except:
            return Response('There\'s no company with that ID', status=status.HTTP_400_BAD_REQUEST)
        serializer = CompanySerializer(company_finded, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CompanyDeleteAPIView(DestroyAPIView):
    serializer_class = CompanySerializer
    def destroy(self, request, id):
        try:
            company_finded = company.objects.get(id = id)
        except:
            return Response('There\'s no company with that ID', status=status.HTTP_400_BAD_REQUEST)
        self.perform_destroy(company_finded)
        return Response('Successfully deleted', status=status.HTTP_202_ACCEPTED)
    
