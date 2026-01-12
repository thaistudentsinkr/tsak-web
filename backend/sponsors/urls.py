from django.urls import path
from . import views

urlpatterns = [
    path('', views.sponsors_list, name='sponsors-list'),
]