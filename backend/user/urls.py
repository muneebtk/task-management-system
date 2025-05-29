from . import views
from django.urls import path


urlpatterns = [
    path("signup/", views.UserRegistrationView.as_view(), name="user_registration"),
    path("signin/", views.signin_user, name="user_signin"),
]
