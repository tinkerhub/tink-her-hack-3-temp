from django.urls import path
from . import views

urlpatterns = [
    path('',views.contact_list,name='contact_list'),
    path('add/',views.add_contact,name='add_contact'),
    path('delete/<int:pk>/', views.delete_contact, name='delete_contact'),
]