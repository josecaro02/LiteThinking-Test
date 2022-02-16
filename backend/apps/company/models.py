from ctypes import addressof
from django.db import models
from sqlalchemy import false, null

class company(models.Model):
    company_name = models.CharField('Nombre empresa', max_length=200, blank=False, null=False)
    address = models.CharField('Direccion', max_length=200, blank=False, null=False)
    nit = models.CharField('NIT', max_length=50, blank=False, null=False)
    phone = models.CharField('Telefono', max_length=50, blank=False, null=False)

    class Meta:
        verbose_name = 'Empresa'
        verbose_name_plural = 'Empresas'

    def __str__(self):
        return "Empresa No: {} {} con NIT: {}".format(self.id, self.company_name, self.nit)
