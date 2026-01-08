from django.urls import path
from .views import RegisterView, ProfileView, ChangePasswordView

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("profile/", ProfileView.as_view()),
    path("change-password/", ChangePasswordView.as_view()),
]
