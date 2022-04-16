import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../models/person.model';

@Injectable({
    providedIn: 'root'
})
export class PeopleService {
    private readonly baseUrl = environment.apis.person;
    constructor(private http: HttpClient) { }

    getPersons(): Observable<Person[]> {
        return this.http
            .get<Person[]>(this.baseUrl)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: any) {
        let errorMessage = '';
        console.log(error);
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(() => {
            return errorMessage;
        });
    }
}
