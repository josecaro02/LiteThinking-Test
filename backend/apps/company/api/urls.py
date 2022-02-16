from django.urls import path
from apps.company.api.api import CompanyAPIView, CompanyPutAPIView, CompanyDeleteAPIView

urlpatterns = [
    path('company/', CompanyAPIView.as_view(), name = 'company'),
    path('company/<id>', CompanyPutAPIView.as_view(), name = 'company'),
    path('companyDelete/<id>', CompanyDeleteAPIView.as_view(), name = 'company'),
]