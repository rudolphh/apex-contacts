import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactSearchComponent } from './contact-search.component';
import { ContactService } from 'src/app/services/contacts.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('ContactSearchComponent', () => {
  let component: ContactSearchComponent;
  let fixture: ComponentFixture<ContactSearchComponent>;
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
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
      providers: [
        { provide: ContactService, useValue: contactServiceSpy },
      ],
      declarations: [ ContactSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
