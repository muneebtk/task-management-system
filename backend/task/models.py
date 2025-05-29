import uuid
from django.conf import settings
from django.db import models
from user.models import User
# Create your models here.


class Task(models.Model):
    status_choices = (
        ("pending", "Pending"),
        ("in_progress", "In Progress"),
        ("completed", "Completed"),
    )
    priority_choices = (
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="tasks",
        null=True,
        blank=True,
        help_text="The user to whom this task belongs.",
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    priority = models.CharField(
        max_length=10,
        choices=priority_choices,
        default="medium",
    )
    status = models.CharField(
        max_length=20,
        choices=status_choices,
        default="pending",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    due_date = models.DateTimeField(blank=True, null=True)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title
