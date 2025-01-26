from django.shortcuts import render, redirect, get_object_or_404
from .models import Contact
from django.contrib import messages
# Create your views here.


def contact_list(request):
    query = request.GET.get('search', '')
    contacts = Contact.objects.filter(name__icontains=query)
    return render(request, 'contacts/contact_list.html', {'contacts': contacts})

def add_contact(request):
    if request.method == 'POST':
        name = request.POST['name']
        number = request.POST['number']
        email = request.POST['email']
        Contact.objects.create(name=name, number=number, email=email)
        return redirect('contact_list')
    return render(request, 'contacts/add_contact.html')
def delete_contact(request, pk):
    contact = get_object_or_404(Contact, pk=pk)
    contact.delete()
    messages.success(request, "Contact deleted successfully.")
    return redirect('contact_list')
