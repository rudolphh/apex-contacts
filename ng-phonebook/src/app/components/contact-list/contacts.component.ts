import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import {Contact} from './contact';
import { ContactDataService } from '../../services/contact-data.service';
import { ContactEditComponent } from '../contact-edit/contact-edit.component';
import {ContactService} from '../../services/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {
  public contacts = [];

  constructor(private contactDataService: ContactDataService, private contactService: ContactService) {
    this.contactDataService.contacts$.subscribe(contacts => {
      this.contacts = contacts;
    });
  }

  ngOnInit(): void {
   // this.readAll();
  }

  private readAll(): Subscription {
    return this.contactService.loadAll().subscribe((list) => {
      this.setContacts(list);
    });
  }

  addContact(contact: Contact): void {
    this.contacts.push(contact);
    this.setContacts(this.contacts);
  }

  setContacts(contacts: Contact[]): void {
    this.contactDataService.setContacts(contacts);
    this.contactDataService.setEditContact(null);
  }

  deleteContact(contact: Contact): void {
    this.contactDataService.deleteContact(contact).subscribe(response => {
      if(response.success) {
        this.setContacts(this.contacts.filter(item => item.id !== contact.id));
      }
    });
  }

  updateContacts(updatedContact: Contact): void {
    const newContacts = this.contacts.map((contact: Contact) => {
      if (contact.id === updatedContact.id) {
        contact = updatedContact;
      }
      return contact;
    });
    this.contactDataService.setContacts(newContacts);
  }

  clickRow(contact: Contact, row: number): void {
    this.contactDataService.setEditContact(contact);
  }
}
