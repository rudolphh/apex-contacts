import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Contact } from '../contact-list/contact';
import { ContactService } from 'src/app/services/contacts.service';
import { Output } from '@angular/core';

@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.component.html',
  styleUrls: ['./contact-search.component.css']
})
export class ContactSearchComponent implements OnInit {

  @Output() resultContacts: EventEmitter<Contact[]> = new EventEmitter<Contact[]>();
  searchForm !: FormGroup;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.searchForm = this.fb.group({
      searchInput: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.searchForm.get('searchInput').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((keyword: string) => this.contactService.findContacts(keyword))
    ).subscribe(contacts => {
      this.resultContacts.emit(contacts);
    });
  }

}
