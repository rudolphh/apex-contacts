import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ContactDataService } from 'src/app/services/contact-data.service';
import { ContactService } from 'src/app/services/contacts.service';
import { ContactsComponent } from './contacts.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { data } from 'src/app/data.json';
import { of } from 'rxjs';

describe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;
  const contactServiceSpy = jasmine.createSpyObj<ContactService>(
    'ContactService',
    {
      loadAll: of([

      ])
    }
  );

  data.push({ id: 3, firstName: 'rudy', lastName: 'hernandez', email: 'rudolpharthur@gmail.com'});
  const contactDataServiceSpy = jasmine.createSpyObj<ContactDataService>(
    'ContactDataService',
    {
      setContacts: undefined,
      deleteContact: of({})
    },
    { contacts$: of(data) }
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: ContactService, useValue: contactServiceSpy},
        { provide: ContactDataService, useValue: contactDataServiceSpy}
      ],
      declarations: [ ContactsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show contacts', () => {
    expect(fixture.nativeElement.querySelectorAll('[data-test="contact"]').length).toBe(3);
  });

  it('should show contact info', () => {
    const contact = fixture.nativeElement.querySelector('[data-test="contact"]');
    expect(contact.querySelector('[data-test="contact-id"]').innerText).toBe('1');
    expect(contact.querySelector('[data-test="contact-firstname"]').innerText).toBe('Jon');
    expect(contact.querySelector('[data-test="contact-lastname"]').innerText).toBe('Smith');
    expect(contact.querySelector('[data-test="contact-email"]').innerText).toBe('a@a.com');
  });
});
