from django.urls import path
from . import views

urlpatterns = [
    path('', views.member_list, name='member-list'),
]