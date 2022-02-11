import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  skip,
  skipWhile,
  switchMap,
} from 'rxjs/operators';

import { Contact } from '../contact-list/contact';
import { ContactDataService } from 'src/app/services/contact-data.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
})
export class ContactEditComponent implements OnInit {
  contact !: Contact;
  editContactForm !: FormGroup;
  @Output() updatedContact = new EventEmitter<Contact>();

  constructor(
    private fb: FormBuilder,
    private contactDataService: ContactDataService
  ) {
    this.editContactForm = this.fb.group({
      id: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(5)]]
    });

  }

  ngOnInit(): void {
    this.contactDataService.editContact$.subscribe(editContact => {
      this.contact = editContact;
      this.editContactForm.reset();
      this.editContactForm.patchValue(editContact);
    });
  }


  onSubmit(): void {
    const contact = this.editContactForm.value;
    this.contactDataService.updateContact(contact).subscribe(response => {
      if (response.success) {
        this.updatedContact.emit(contact);
      }
    });
  }
}
