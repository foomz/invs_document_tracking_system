from django.contrib import admin

# Register your models here.
from . models import Document

from import_export.admin import ImportExportModelAdmin

admin.site.register(Document, ImportExportModelAdmin)