from django.urls import path
from .views import EmployeeView, EmployeeDeleteView

urlpatterns = [
    path("", EmployeeView.as_view()),
    path("<int:pk>/", EmployeeDeleteView.as_view()),
]
