import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ContactFormComponent } from './contact-form.component';
import { ContactService } from 'src/app/services/contacts.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  const contactServiceSpy = jasmine.createSpyObj<ContactService>(
    'ContactService',
    {
      postContact: of({
        id: 3,
        email: 'ru@dy.com',
        firstName: 'Rudy',
        lastName: 'Hernandez',
      }),
    }
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, FormsModule, ReactiveFormsModule ],
      declarations: [ContactFormComponent],
      providers: [{ provide: ContactService, useValue: contactServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have header h1 with the text \'Add Contact\'', () => {
    const compiled: HTMLElement = fixture.nativeElement;
    const addContactHeader = compiled.querySelector('[data-test="add-contact"');
    expect(addContactHeader.nodeName.toLowerCase()).toBe('h1');
    expect(addContactHeader.textContent).toBe('Add Contact');
  });
});
