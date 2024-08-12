from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DocumentViewSet, OutgoingDocumentViewSet, OutADINVSDocumentViewSet, MailedDocumentViewSet, BIForApplicantViewSet, FinalReportViewSet, PostOperationReportStatViewSet
from .views import OperateViewSet, CoplanViewSet, PostOperationReportViewSet, NoticeOfOperationViewSet, AuthorityToOperateViewSet, CoplanStatViewSet, NoticeOperationViewset
router = DefaultRouter()
router.register(r'documents', DocumentViewSet)
router.register(r'outgoing', OutgoingDocumentViewSet)   #OutGoing
router.register(r'outadinvs', OutADINVSDocumentViewSet)   #OutADINVS
router.register(r'mailed', MailedDocumentViewSet)
router.register(r'biforapplicant', BIForApplicantViewSet)
router.register(r'final_report', FinalReportViewSet)
router.register(r'Operate', OperateViewSet)
router.register(r'Coplan', CoplanViewSet)
router.register(r'PostOperationReport', PostOperationReportViewSet)
router.register(r'NoticeOfOperation', NoticeOfOperationViewSet)
router.register(r'AuthorityToOperate', AuthorityToOperateViewSet)
router.register(r'CoplanStat', CoplanStatViewSet)
router.register(r'NoticeOperation', NoticeOperationViewset)
router.register(r'PostOperationReportStat', PostOperationReportStatViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
