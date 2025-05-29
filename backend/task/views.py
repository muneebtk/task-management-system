from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied
from .models import Task
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing tasks.
    Supports Create, Read, Update, and Delete operations.
    """

    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Users can only access their own tasks
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        print("Creating a new task with data:", self.request.data)
        # Associate the task with the authenticated user
        serializer.save(user=self.request.user)
