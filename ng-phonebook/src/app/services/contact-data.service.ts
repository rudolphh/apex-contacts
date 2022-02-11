import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Contact } from '../components/contact-list/contact';
import { ContactService } from './contacts.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactDataService {

  private contactsDataSource$ = new BehaviorSubject<Contact[]>([]);
  public contacts$ = this.contactsDataSource$.asObservable();

  private editContactDataSource$ = new Subject<Contact>();
  public editContact$ = this.editContactDataSource$.asObservable();

  constructor(private contactService: ContactService) {
    this.contactService.loadAll().subscribe(contacts => {
      this.contactsDataSource$.next(contacts);
    });
  }

  setEditContact(contact: Contact): void {
    this.editContactDataSource$.next(contact);
  }

  setContacts(contacts: Contact[]): void {
    this.contactsDataSource$.next(contacts);
  }

  updateContact(contact: Contact): Observable<any> {
    return this.contactService.putContact(contact);
  }

  deleteContact(contact: Contact): Observable<any> {
    return this.contactService.deleteContactById(contact.id);
  }
}
