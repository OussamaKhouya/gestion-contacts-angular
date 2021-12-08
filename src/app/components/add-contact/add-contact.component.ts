import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  statusEditContact : boolean = false;
  contact: Contact = {}
  constructor(private service: ContactService) { }

  ngOnInit(): void {
  }
  addContact(){
    this.service.addContact(this.contact);
    this.contact = {}
    this.statusEditContact = false;
  }


}
