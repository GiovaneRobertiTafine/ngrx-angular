import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../models/person.model';

@Injectable({
    providedIn: 'root'
})
export class PersonService {
    private readonly baseUrl = environment.apis.person;
    constructor(private http: HttpClient) { }

    getPersons(): Observable<Person[]> {
        return this.http
            .get<Person[]>(this.baseUrl)
            .pipe(catchError(this.handleError<Person[]>('get')));
    }

    addPerson(): Observable<Person> {
        return this.http
            .post<Person>(this.baseUrl, {}, { responseType: 'json' })
            .pipe(catchError(this.handleError<Person>('post')));
    }

    update(p: Person): Observable<Person> {
        const uri = `${this.baseUrl}/${p._id}`;
        return this.http
            .put<Person>(uri, p, { responseType: 'json' })
            .pipe(catchError(this.handleError<Person>('put')));
    }

    private handleError<T>(name?: string) {
        return (httpResponse: any): Observable<T> => {
            console.log(name);
            if (httpResponse.status === 0) {
                // A client-side or network error occurred. Handle it accordingly.
                console.error('An error occurred:', httpResponse.error);
            } else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong.
                console.error(
                    `Backend returned code ${httpResponse.status}, body was: `, httpResponse.error);
            }
            // Return an observable with a user-facing error message.
            // return throwError(() => new Error('Something bad happened; please try again later.'));
            return throwError(() => new Error('Something bad happened; please try again later.'));
        };
    }
}
