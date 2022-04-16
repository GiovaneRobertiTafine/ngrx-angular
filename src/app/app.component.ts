import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subject, takeUntil } from 'rxjs';
import { Person } from './models/person.model';
import { PeopleService } from './services/people.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    people$!: Observable<Person[]>;
    private unsubscribe$: Subject<any> = new Subject();

    constructor(private peopleService: PeopleService) { }

    ngOnInit(): void {
        this.people$ = this.peopleService.getPersons();
        // .pipe(takeUntil(this.unsubscribe$));

    }

    addNew() {
        this.unsubscribe$.next('');
    }

    update(p: Person) {

    }

    delete(p: Person) {

    }

    ngOnDestroy(): void {
        this.unsubscribe$.next('');
    }
}
