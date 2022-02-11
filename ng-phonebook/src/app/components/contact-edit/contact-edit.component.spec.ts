import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { Contact } from '../contact-list/contact';
import { ContactDataService } from 'src/app/services/contact-data.service';
import { ContactEditComponent } from './contact-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('ContactEditComponent', () => {
  let component: ContactEditComponent;
  let fixture: ComponentFixture<ContactEditComponent>;
  const contactDataServiceSpy = jasmine.createSpyObj<ContactDataService>(
    'ContactDataService',
    {
      updateContact: of({})
    },
    { editContact$: of() }
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [
        { provide: ContactDataService, useValue: contactDataServiceSpy}
      ],
      declarations: [ ContactEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEditComponent);
    component = fixture.componentInstance;
    component.contact = { id: 0, firstName: 'John', lastName: 'Doe', email: 'john@doe.com'} as Contact;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show contact-id', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('[data-test="contact-id"]')).toBeTruthy();
  });

  it('should show first-name', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('[data-test="first-name"]')).toBeTruthy();
  });

  it('should show last-name', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('[data-test="last-name"]')).toBeTruthy();
  });

  it('should show email', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('[data-test="email"]')).toBeTruthy();
  });
});
