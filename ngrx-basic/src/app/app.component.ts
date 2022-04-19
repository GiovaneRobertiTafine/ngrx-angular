import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { interval, Observable, pipe, Subject, takeUntil } from 'rxjs';
import { Person } from './models/person.model';
import { PersonService } from './services/people.service';
import { AppState } from './store';
import { PersonAll, PersonInitial, PersonNew, PersonUpdate } from './store/person.actions';
import { initialState } from './store/person.reducer';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    person$!: Observable<Person[]>;
    private unsubscribe$: Subject<any> = new Subject();

    constructor(private personService: PersonService, private store: Store<AppState>) { }

    ngOnInit(): void {
        this.personService.getPersons()
            .subscribe(
                (response) => {
                    this.store.dispatch(new PersonInitial({ person: response }));
                    this.person$ = this.store.select('person');
                }
            );

        // this.store.dispatch(new PersonAll({ persons: [] }, this.personService));
        // this.person$ = this.store.select('person');

    }

    addNew() {
        this.personService.addPerson()
            .subscribe(
                (response) => {
                    this.store.dispatch(new PersonNew({ person: response }));
                }
            );
    }

    update(p: Person) {
        const updatePerson: Person = {
            ...p,
            name: 'New name' + Math.floor(Math.random() * 10) + 1,
            age: Math.floor(Math.random() * 10) + 1,
            address: 'New address' + Math.floor(Math.random() * 10) + 1,
            city: 'New city' + Math.floor(Math.random() * 10) + 1,
            country: 'New country' + Math.floor(Math.random() * 10) + 1,
        };
        this.personService.update(updatePerson)
            .subscribe(
                (response) => {
                    this.store.dispatch(new PersonUpdate({ person: response }));
                    this.person$ = this.store.select('person');
                }
            );
    }

    delete(p: Person) {

    }

    ngOnDestroy(): void {
        this.unsubscribe$.next('');
    }
}
