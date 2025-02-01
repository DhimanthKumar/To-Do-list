from rest_framework import serializers
from . import models
class storageserializer(serializers.ModelSerializer):
    class Meta:
        model=models.store
        fields='__all__'
        
    