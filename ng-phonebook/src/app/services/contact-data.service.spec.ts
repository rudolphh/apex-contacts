import { ContactDataService } from './contact-data.service';
import { ContactService } from './contacts.service';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

describe('ContactDataService', () => {
  let service: ContactDataService;
  const contactServiceSpy = jasmine.createSpyObj<ContactService>(
    'ContactService',
    {
      postContact: of({
        id: 3,
        email: 'ru@dy.com',
        firstName: 'Rudy',
        lastName: 'Hernandez',
      }),
      findContacts: of([
        {
          id: 3,
          email: 'ru@dy.com',
          firstName: 'Rudy',
          lastName: 'Hernandez',
        }
      ]),
      loadAll: of([])
    }
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ContactService, useValue: contactServiceSpy },
      ]
    });
    service = TestBed.inject(ContactDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
