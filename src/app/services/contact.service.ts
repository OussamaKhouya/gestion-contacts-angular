import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { map, Observable } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactsCollection: AngularFirestoreCollection<Contact>;
  contactDoc: AngularFirestoreDocument<Contact> | undefined;
  contacts: Observable<Contact[]>;
  constructor(private afs: AngularFirestore) { //afs : angular firestore

    this.contactsCollection = this.afs.collection('contacts')
    this.contacts = this.contactsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Contact;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getContacts() {
    return this.contacts;
  }
  addContact(contact: Contact) {
    this.contactsCollection.add(contact);
  }
  updateContact(contact: Contact) {
    this.contactDoc = this.contactsCollection.doc<Contact>(contact.id);
    this.contactDoc.update(contact);
  }
  deleteContact(contact: Contact){
    this.contactDoc = this.contactsCollection.doc<Contact>(contact.id);
    this.contactDoc.delete();

  }
}


