from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def get_data(request):
    data = {
        'message': 'This is a normal JSON response from DRF',
        'status': 'success'
    }
    return Response(data)
