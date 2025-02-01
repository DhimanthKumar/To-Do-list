from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('home', views.get_data),  # Function-based view
    path('get', views.getdata.as_view({'get': 'list'})),  # Class-based view with GET method
    path('post', views.getdata.as_view({'post': 'create'})),  # Class-based view with POST method
    path('patch/<int:pk>', views.getdata.as_view({'patch': 'patch'})),  # Class-based view with PATCH method
    path('delete/<int:pk>' , views.getdata.as_view({'delete' : 'destroy'})),
]
