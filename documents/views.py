# documents/views.py
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Document, outgoing, outadinvs, mailed, BIForApplicant, FinalReport, Operate, Coplan, PostOperationReport, NoticeOfOperation
from .serializers import AuthorityToOperate, CoplanStat, NoticeOperation, PostOperationReportStat
from .serializers import DocumentSerializer, OutgoingDocumentSerializer, OutADINVSDocumentSerializer, PostOperationReportSerializer
from .serializers import MailedDocumentSerializer, BIForApplicantSerializer, FinalReportSerializer, CoplanSerializer, NoticeOfOperationSerializer
from .serializers import AuthorityToOperateSerializer, CoplanStatSerializer, NoticeOperationSerializer, PostOperationReportStatSerializer
from .serializers import OperateSerializer

class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    def create(self, request, *args, **kwargs):
        print(request.data)  # Add this line to see the incoming request data
        return super().create(request, *args, **kwargs)

class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

class OutgoingDocumentViewSet(viewsets.ModelViewSet):
    queryset = outgoing.objects.all()
    serializer_class = OutgoingDocumentSerializer

class OutADINVSDocumentViewSet(viewsets.ModelViewSet):
    queryset = outadinvs.objects.all()
    serializer_class = OutADINVSDocumentSerializer

class MailedDocumentViewSet(viewsets.ModelViewSet):
    queryset = mailed.objects.all()
    serializer_class = MailedDocumentSerializer

class BIForApplicantViewSet(viewsets.ModelViewSet):
    queryset = BIForApplicant.objects.all()
    serializer_class = BIForApplicantSerializer

class FinalReportViewSet(viewsets.ModelViewSet):
    queryset = FinalReport.objects.all()
    serializer_class = FinalReportSerializer

class OperateViewSet(viewsets.ModelViewSet):
    queryset = Operate.objects.all()
    serializer_class = OperateSerializer

class CoplanViewSet(viewsets.ModelViewSet):
    queryset = Coplan.objects.all()
    serializer_class = CoplanSerializer

class PostOperationReportViewSet(viewsets.ModelViewSet):
    queryset = PostOperationReport.objects.all()
    serializer_class = PostOperationReportSerializer

class NoticeOfOperationViewSet(viewsets.ModelViewSet):
    queryset = NoticeOfOperation.objects.all()
    serializer_class = NoticeOfOperationSerializer

class AuthorityToOperateViewSet(viewsets.ModelViewSet):
    queryset = AuthorityToOperate.objects.all()
    serializer_class = AuthorityToOperateSerializer

class CoplanStatViewSet(viewsets.ModelViewSet):
    queryset = CoplanStat.objects.all()
    serializer_class = CoplanStatSerializer

class NoticeOperationViewset(viewsets.ModelViewSet):
    queryset = NoticeOperation.objects.all()
    serializer_class = NoticeOperationSerializer

class PostOperationReportStatViewSet(viewsets.ModelViewSet):
    queryset = PostOperationReportStat.objects.all()
    serializer_class = PostOperationReportStatSerializer