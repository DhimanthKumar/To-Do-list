from django.db import models
from django.utils import timezone
# Create your models here.
class store(models.Model):
    class Status(models.TextChoices):
        PENDING = 'P', 'Pending'
        IN_PROGRESS = 'IP', 'In Progress'
        COMPLETED = 'C', 'Completed'

    job= models.CharField(max_length=255)
    status=models.CharField(
        max_length=2,
        choices=Status.choices,
        default=Status.PENDING
    )
    deadline = models.DateTimeField()
    completed_at = models.DateTimeField(null=True, blank=True)  # When task was completed (if applicable)
    created_at = models.DateTimeField(auto_now_add=True)  # DateTime when the task was created
    updated_at = models.DateTimeField(auto_now=True)  # DateTime when the task was last updated
    deleted = models.BooleanField(default=False)
    def __str__(self):
        return f"{self.job} - {self.status}"

    def mark_completed(self):
        self.status = self.Status.COMPLETED
        self.completed_at = timezone.now()
        self.save()
    
    def mark_in_progress(self):
        self.status = self.Status.IN_PROGRESS
        self.save()

    def mark_pending(self):
        self.status = self.Status.PENDING
        self.save()

    # Soft delete (doesn't actually delete, just marks it as deleted)
    def delete_task(self):
        self.deleted = True
        self.save()

    # Restore a soft deleted task
    def restore_task(self):
        self.deleted = False
        self.save()