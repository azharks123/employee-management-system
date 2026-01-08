from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Employee, EmployeeFieldValue
from .serializers import (
    EmployeeCreateSerializer,
    EmployeeListSerializer,
)


class EmployeeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = EmployeeCreateSerializer(data=request.data)
        if serializer.is_valid():
            employee = serializer.save()
            return Response(
                {"message": "Employee created", "id": employee.id},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        queryset = Employee.objects.all()

        label = request.query_params.get("label")
        value = request.query_params.get("value")

        if label and value:
            queryset = queryset.filter(
                values__field__label__iexact=label,
                values__value__icontains=value,
            )

        serializer = EmployeeListSerializer(queryset, many=True)
        return Response(serializer.data)


class EmployeeDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        Employee.objects.filter(id=pk).delete()
        return Response(
            {"message": "Employee deleted"},
            status=status.HTTP_204_NO_CONTENT,
        )
