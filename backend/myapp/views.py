from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets
from . import serializers
from . import models
from rest_framework import status

@api_view(['GET'])
def get_data(request):
    data = {
        'message': 'This is a normal JSON response from DRF',
        'status': 'success'
    }
    return Response(data)
class getdata(viewsets.ViewSet):
    def list(self,request):
        storageserializer=serializers.storageserializer
        store = models.store
        serializer = storageserializer(store.objects.all(),many=True)
        return Response(serializer.data)
    def create(self,request):
        storageserializer=serializers.storageserializer
        serializer = storageserializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'Status' : 'Sucess'} ,status=status.HTTP_201_CREATED)
        return Response({'Status' : 'Failed'} , status=status.HTTP_400_BAD_REQUEST)
    # def patch(self,request):
    def patch(self, request, pk):

        try:
            # Fetch the storage instance by primary key
            storage = models.store.objects.get(pk=pk)
            if request.data['status'] == 'C':
                storage.mark_completed()
        except models.store.DoesNotExist:
            return Response({'error': 'Storage not found'}, status=status.HTTP_404_NOT_FOUND)

        # Initialize the serializer with the instance and request data
        serializer = serializers.storageserializer(storage, data=request.data, partial=True)
        if serializer.is_valid():
            
            serializer.save()  # Save the updates
            return Response(serializer.data, status=status.HTTP_200_OK)

        # Return validation errors if any
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def destroy(self, request, pk=None):
        try:
            # Fetch the storage instance by primary key
            storage = models.store.objects.get(pk=pk)
            storage.delete()  # Delete the instance
            return Response({'message': 'Storage deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except models.store.DoesNotExist:
            return Response({'error': 'Storage not found'}, status=status.HTTP_404_NOT_FOUND)