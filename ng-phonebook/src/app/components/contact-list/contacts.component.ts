import {Component, OnInit} from '@angular/core';

import {Contact} from './contact';
import {ContactService} from '../../services/contacts.service';
import { Subscription } from 'rxjs';
import {updatePlaceholderMap} from '@angular/compiler/src/render3/view/i18n/util';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {
  public contacts = [];

  constructor(private contactService: ContactService) {
  }

  ngOnInit(): void {
    this.readAll();
  }

  private readAll(): Subscription {
    return this.contactService.loadAll().subscribe((list) => {
      this.contacts = list;
    });
  }
}
