#models.py
from django.db import models
from django.core.exceptions import ValidationError
import datetime

def validate_date_format(value):
    if value:
        try:
            datetime.datetime.strptime(value, '%Y-%m-%d')
        except ValueError:
            raise ValidationError(
                'Date has wrong format. Use one of these formats instead: YYYY-MM-DD.'
            )

class Document(models.Model):
    tracking_no = models.CharField(max_length=999,null=True, blank=True)
    date_received = models.DateField(null=True, blank=True)
    received_from = models.CharField(max_length=999, null=True, blank=True)
    type_of_document = models.CharField(max_length=999, null=True, blank=True)
    subjects = models.TextField(max_length=999, null=True, blank=True)
    forwarded_to = models.CharField(max_length=100, null=True, blank=True)
    date_transmitted = models.DateField(null=True, blank=True)  # Optional field
    received_by = models.CharField(max_length=999, null=True, blank=True)  # Optional field
    remarks = models.TextField(max_length=999, null=True, blank=True)  # Optional field
    reference_no = models.CharField(max_length=999, null=True, blank=True)  # Optional field
    encoded_by = models.CharField(max_length=999, null=True, blank=True)
    image = models.ImageField(upload_to='documents/', null=True, blank=True)

class outgoing(models.Model):
    tracking_no = models.CharField(max_length=100)
    received_from = models.CharField(max_length=100)
    subjects = models.TextField()
    forwarded_to = models.CharField(max_length=100)
    date_transmitted = models.DateField(null=True, blank=True)  # Adjust as needed
    received_by = models.CharField(max_length=100, null=True, blank=True)


class outadinvs(models.Model):
    tracking_no = models.CharField(max_length=100)
    received_from = models.CharField(max_length=100)
    subjects = models.TextField()
    forwarded_to = models.CharField(max_length=100)
    date_transmitted = models.DateField(null=True, blank=True)  # Adjust as needed
    received_by = models.CharField(max_length=100, null=True, blank=True)

class mailed(models.Model):
    tracking_no = models.CharField(max_length=100)
    received_from = models.CharField(max_length=100)
    subjects = models.TextField()
    forwarded_to = models.CharField(max_length=100)
    date_transmitted = models.DateField(null=True, blank=True)  # Adjust as needed
    received_by = models.CharField(max_length=100, null=True, blank=True)

class BIForApplicant(models.Model):
    tracking_no = models.CharField(max_length=100)
    date_received = models.DateField()
    received_from = models.CharField(max_length=255)
    subjects = models.TextField()
    field_office = models.CharField(max_length=100, null=True, blank=True)
    forwarded_to = models.CharField(max_length=255)
    date_transmitted = models.DateField(null=True, blank=True)
    received_by = models.CharField(max_length=255, null=True, blank=True)
    remarks = models.TextField(max_length=100, null=True, blank=True)
    reference_no = models.CharField(max_length=100, null=True, blank=True)
    return_result = models.TextField(max_length=100, null=True, blank=True)

class FinalReport(models.Model):
    tracking_no = models.CharField(max_length=255, default="")
    applicant = models.CharField(max_length=255)
    ro_do = models.CharField(max_length=255)
    date_received = models.DateField(null=True, blank=True)
    date_transmitted = models.DateField(null=True, blank=True)  # Optional field
    transmitted_to = models.CharField(max_length=255, null=True, blank=True)

class Operate(models.Model):
    control_no = models.CharField(max_length=255, default="")
    adinvs_rs = models.CharField(max_length=255, default="")
    reference_no = models.CharField(max_length=100, null=True, blank=True)
    rdo = models.CharField(max_length=255)
    requesting_party_aoc = models.CharField(max_length=255)
    mode_of_opn = models.CharField(max_length=255)
    noc = models.CharField(max_length=255)
    complainant = models.CharField(max_length=255)
    subject = models.TextField()
    date_of_opn = models.DateField(null=True, blank=True)  # Optional field
    place_of_opn = models.CharField(max_length=100, null=True, blank=True)

class Coplan(models.Model):
    control_no = models.CharField(max_length=255, default="")
    adinvs_rs = models.CharField(max_length=255, default="")
    reference_no = models.CharField(max_length=100, null=True, blank=True)
    rdo = models.CharField(max_length=255)
    requesting_party_aoc = models.CharField(max_length=255)
    mode_of_opn = models.CharField(max_length=255)
    noc = models.CharField(max_length=255)
    complainant = models.CharField(max_length=255)
    subject = models.CharField(max_length=500, null=True, blank=True)
    date_of_opn = models.DateField(null=True, blank=True)  # Optional field
    place_of_opn = models.CharField(max_length=100, null=True, blank=True)
    approve_amount = models.CharField(max_length=100, null=True, blank=True)
    estimated_exp = models.CharField(max_length=100, null=True, blank=True)

class PostOperationReport(models.Model):
    control_no = models.CharField(max_length=255, default="")
    adinvs_rs = models.CharField(max_length=255, default="")
    reference_no = models.CharField(max_length=100, null=True, blank=True)
    rdo = models.CharField(max_length=255)
    requesting_party_aoc = models.CharField(max_length=255)
    mode_of_opn = models.CharField(max_length=255)
    noc = models.CharField(max_length=255)
    complainant = models.CharField(max_length=255)
    subject = models.CharField(max_length=500, null=True, blank=True)
    date_of_opn = models.DateField(null=True, blank=True)  # Optional field
    place_of_opn = models.CharField(max_length=100, null=True, blank=True)
    disposition_result = models.CharField(max_length=500, null=True, blank=True)

class NoticeOfOperation(models.Model):
    control_no = models.CharField(max_length=255, default="")
    adinvs_rs = models.CharField(max_length=100, null=True, blank=True)
    reference_no = models.CharField(max_length=100, null=True, blank=True)
    rdo = models.CharField(max_length=255)
    requesting_party_aoc = models.CharField(max_length=255)
    mode_of_opn = models.CharField(max_length=255)
    noc = models.CharField(max_length=255)
    complainant = models.CharField(max_length=500, null=True, blank=True)
    subject = models.CharField(max_length=500, null=True, blank=True)
    date_of_opn = models.DateField(null=True, blank=True)  # Optional field
    place_of_opn = models.CharField(max_length=100, null=True, blank=True)

class AuthorityToOperate(models.Model):
    region = models.CharField(max_length=500)
    month = models.CharField(max_length=500)
    value = models.IntegerField()

class CoplanStat(models.Model):
    region = models.CharField(max_length=500)
    month = models.CharField(max_length=500)
    value = models.IntegerField()

class NoticeOperation(models.Model):
    region = models.CharField(max_length=500)
    month = models.CharField(max_length=500)
    value = models.IntegerField()

class PostOperationReportStat(models.Model):
    region = models.CharField(max_length=500)
    month = models.CharField(max_length=500)
    value = models.IntegerField()


    def __str__(self):
        return self.tracking_no
