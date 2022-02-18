import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ContactService } from './contacts.service';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { data } from 'src/app/data.json';
import { of } from 'rxjs';

describe('ContactService', () => {
  let service: ContactService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule ],
      providers: [ContactService]
    });
    service = TestBed.inject(ContactService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should return the list of contacts', () => {

    // spy on and mock the httpclient
    spyOn(httpClient, 'get').and.returnValue(of({ data }));// { data } bc of mapped response

    // use our service to get the list of contacts
    const spy = jasmine.createSpy('spy');
    service.loadAll().subscribe(spy);

    // verify the service returned the mock data
    expect(spy).toHaveBeenCalledWith(data);

    // verify the service called the correct http endpoint
    //expect(httpClient.get).toHaveBeenCalledWith('http://localhost:3000/api/v1/contacts');
  });
});
