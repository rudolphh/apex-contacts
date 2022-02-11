import {Component, OnInit} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import {Contact} from './contact';
import { ContactDataService } from '../../services/contact-data.service';
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
  }

  deleteContact(contact: Contact): void {
    this.contactDataService.deleteContact(contact).subscribe(response => {
      if(response.success) {
        this.setContacts(this.contacts.filter(item => item.id !== contact.id));
      }
    });
  }
}
