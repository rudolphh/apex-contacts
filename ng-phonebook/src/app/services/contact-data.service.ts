import { BehaviorSubject, Observable } from 'rxjs';

import { Contact } from '../components/contact-list/contact';
import { ContactService } from './contacts.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactDataService {

  private contactsDataSource$ = new BehaviorSubject<Contact[]>([]);
  public contacts$ = this.contactsDataSource$.asObservable();

  constructor(private contactService: ContactService) {
    this.contactService.loadAll().subscribe(contacts => {
      this.contactsDataSource$.next(contacts);
    });
  }

  setContacts(contacts: Contact[]): void {
    this.contactsDataSource$.next(contacts);
  }

  deleteContact(contact: Contact): Observable<any> {
    return this.contactService.deleteContactById(contact.id);
  }
}
