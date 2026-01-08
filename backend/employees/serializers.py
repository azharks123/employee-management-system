from rest_framework import serializers
from .models import Employee, EmployeeFieldValue


class EmployeeFieldValueSerializer(serializers.ModelSerializer):
    label = serializers.CharField(source="field.label", read_only=True)

    class Meta:
        model = EmployeeFieldValue
        fields = ("field", "label", "value")


class EmployeeCreateSerializer(serializers.Serializer):
    form_id = serializers.IntegerField()
    data = serializers.ListField()

    def create(self, validated_data):
        from forms.models import Form, FormField

        form = Form.objects.get(id=validated_data["form_id"])
        employee = Employee.objects.create(form=form)

        for item in validated_data["data"]:
            field = FormField.objects.get(id=item["field_id"])
            EmployeeFieldValue.objects.create(
                employee=employee,
                field=field,
                value=item["value"],
            )

        return employee


class EmployeeListSerializer(serializers.ModelSerializer):
    data = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = ("id", "form", "data", "created_at")

    def get_data(self, obj):
        return {
            value.field.label: value.value
            for value in obj.values.all()
        }
