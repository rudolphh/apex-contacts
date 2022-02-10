import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactFormComponent } from './contact-form.component';
import { ContactService } from 'src/app/services/contacts.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let contactServiceSpy = jasmine.createSpyObj<ContactService>(
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
});
