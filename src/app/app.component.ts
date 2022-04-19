import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { interval, Observable, pipe, Subject, takeUntil } from 'rxjs';
import { Person } from './models/person.model';
import { PeopleService } from './services/people.service';
import { AppState } from './store';
import { PersonAll, PersonInitial, PersonNew } from './store/person.actions';
import { initialState } from './store/person.reducer';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    people$!: Observable<Person[]>;
    private unsubscribe$: Subject<any> = new Subject();

    constructor(private peopleService: PeopleService, private store: Store<AppState>) { }

    ngOnInit(): void {
        this.peopleService.getPersons()
            .subscribe(
                (response) => {
                    this.store.dispatch(new PersonInitial({ persons: response }));
                    this.people$ = this.store.select('person');
                }
            );

    }

    addNew() {
        this.peopleService.addPerson()
            .subscribe(
                (response) => {
                    console.log(response);
                    this.store.dispatch(new PersonNew({ person: response }));
                }
            );
    }

    update(p: Person) {

    }

    delete(p: Person) {

    }

    ngOnDestroy(): void {
        this.unsubscribe$.next('');
    }
}
