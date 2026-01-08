from rest_framework import serializers
from .models import Form, FormField


class FormFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormField
        fields = ("id", "label", "field_type", "order")


class FormSerializer(serializers.ModelSerializer):
    fields = FormFieldSerializer(many=True)

    class Meta:
        model = Form
        fields = ("id", "name", "fields")

    def create(self, validated_data):
        fields_data = validated_data.pop("fields", [])
        form = Form.objects.create(**validated_data)

        for index, field in enumerate(fields_data):
            FormField.objects.create(
                form=form,
                label=field["label"],
                field_type=field["field_type"],
                order=index,
            )
        return form

    def update(self, instance, validated_data):
        fields_data = validated_data.pop("fields", [])
        instance.name = validated_data.get("name", instance.name)
        instance.save()

        instance.fields.all().delete()
        for index, field in enumerate(fields_data):
            FormField.objects.create(
                form=instance,
                label=field["label"],
                field_type=field["field_type"],
                order=index,
            )
        return instance
