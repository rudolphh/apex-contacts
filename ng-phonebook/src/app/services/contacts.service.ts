import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, map, shareReplay} from 'rxjs/operators';

import {Contact} from '../components/contact-list/contact';
import {Injectable} from '@angular/core';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class ContactService {

    constructor(private http: HttpClient) {
    }

    serverUrl = 'http://localhost:3000/api/v1/contacts';

    private static handleError(error: HttpErrorResponse): Observable<never> {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return throwError(
            'Something bad happened; please try again later.');
    }

    postContact(contact: Contact): Observable<Contact> {
        return this.http.post<Contact>(this.serverUrl, contact, httpOptions)
            .pipe(
              map((response: any) => response.data),
              catchError(ContactService.handleError)
            );
    }

    putContact(contact: Contact): Observable<Contact> {
        return this.http.put<Contact>(this.serverUrl + '/' + contact.id, contact, httpOptions)
            .pipe(catchError(ContactService.handleError));
    }

    loadAll(): Observable<Contact[]> {
        return this.http.get<Contact[]>(this.serverUrl, httpOptions)
            .pipe(
              map((response: any) => response.data),
              catchError(ContactService.handleError)
            );
    }

    getById(id): Observable<Contact> {
        return this.http.get<Contact>(this.serverUrl + '/' + id, httpOptions)
            .pipe(catchError(ContactService.handleError));
    }

    deleteContactById(id: number): Observable<any> {
      return this.http.delete(this.serverUrl + '/' + id, httpOptions)
          .pipe(catchError(ContactService.handleError));
    }

    findContacts(keyword: string): Observable<Contact[]> {
      return this.http.get<Contact[]>(this.serverUrl + '?keyword=' + keyword, httpOptions)
        .pipe(
          map((response: any) => response.data),
          catchError(ContactService.handleError)
        );
    }

}
