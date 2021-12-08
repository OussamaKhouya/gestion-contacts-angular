import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.css']
})
export class ListContactsComponent implements OnInit {
  contacts: any;
  showEditSection: boolean= false;
  selectedContact: Contact = {};

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
      console.log(this.contacts)
    })
  }

  updateContact(contact:Contact){
    this.contactService.updateContact(contact);
    this.showEditSection = false;
  }
  getSelectedContact(contact:Contact){
    this.selectedContact = contact;
    this.showEditSection = true
  }
  deleteContact(contact:Contact){
    if(confirm("Are you sure you want to delete this contact!")){
      this.contactService.deleteContact(contact);
    }else this.showEditSection = false;
  }

}
