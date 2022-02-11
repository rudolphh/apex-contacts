import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ContactDataService } from 'src/app/services/contact-data.service';
import { ContactService } from 'src/app/services/contacts.service';
import { ContactsComponent } from './contacts.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;
  const contactServiceSpy = jasmine.createSpyObj<ContactService>(
    'ContactService',
    {
      loadAll: of([])
    }
  );

  const contactDataServiceSpy = jasmine.createSpyObj<ContactDataService>(
    'ContactDataService',
    {
      setContacts: undefined,
      deleteContact: of({})
    },
    { contacts$: of([]) }
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
