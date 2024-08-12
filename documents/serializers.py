# documents/serializers.py
from rest_framework import serializers
from .models import Document
from .models import outgoing #OutGoing
from .models import outadinvs #OutADINVST
from .models import mailed #OutADINVST
from .models import BIForApplicant #BIForApplicant
from .models import FinalReport
from .models import Operate
from .models import Coplan
from .models import PostOperationReport
from .models import NoticeOfOperation
from .models import AuthorityToOperate
from .models import CoplanStat
from .models import NoticeOperation
from .models import PostOperationReportStat
class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'
        extra_kwargs = {
            'date_received': {'required': False},
            'date_transmitted': {'required': False},
        }

    def validate_date_transmitted(self, value):
        if value is None:
            return value
        # Add any additional validation if necessary
        return value

    def validate_received_by(self, value):
        if value is None:
            return value
        # Add any additional validation if necessary
        return value

    def validate_remarks(self, value):
        if value is None:
            return value
        # Add any additional validation if necessary
        return value

    def validate_reference_no(self, value):
        if value is None:
            return value
        # Add any additional validation if necessary
        return value

class OutgoingDocumentSerializer(serializers.ModelSerializer):  #OutGoing
    class Meta:
        model = outgoing
        fields = '__all__'

class OutADINVSDocumentSerializer(serializers.ModelSerializer):  #OutGoing
    class Meta:
        model = outadinvs
        fields = '__all__'

class MailedDocumentSerializer(serializers.ModelSerializer):  #OutGoing
    class Meta:
        model = mailed
        fields = '__all__'

class BIForApplicantSerializer(serializers.ModelSerializer):
    class Meta:
        model = BIForApplicant
        fields = '__all__'

class FinalReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinalReport
        fields = '__all__'

class OperateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operate
        fields = '__all__'

class CoplanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coplan
        fields = '__all__'

class PostOperationReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostOperationReport
        fields = '__all__'

class NoticeOfOperationSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoticeOfOperation
        fields = '__all__'

class AuthorityToOperateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthorityToOperate
        fields = '__all__'

class CoplanStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoplanStat
        fields = '__all__'

class NoticeOperationSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoticeOperation
        fields = '__all__'

class PostOperationReportStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostOperationReportStat
        fields = '__all__'