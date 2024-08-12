from django.core.management.base import BaseCommand
from documents.models import Document

class Command(BaseCommand):
    help = 'Deletes documents in batches to avoid overwhelming the system.'

    def handle(self, *args, **kwargs):
        batch_size = 1000  # Number of documents to delete in each batch

        while True:
            documents = Document.objects.all()[:batch_size]
            if not documents.exists():
                break

            for document in documents:
                document.delete()

            self.stdout.write(self.style.SUCCESS(f'Deleted {batch_size} documents'))

        self.stdout.write(self.style.SUCCESS('All documents deleted successfully!'))
