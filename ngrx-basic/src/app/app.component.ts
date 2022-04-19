import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Person } from './models/person.model';
import { AppState, selectPersonLast, selectPersonCount, selectPerson, selectPersonCountAge } from './store';
import { PersonAll, PersonDelete, PersonNew, PersonUpdate } from './store/person.actions';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    person$!: Observable<Person[]>;
    personCount$!: Observable<number>;
    personLast$!: Observable<any>;
    personCountAge$!: Observable<any>;

    constructor(private store: Store<AppState>) { }

    ngOnInit(): void {
        this.store.dispatch(new PersonAll());
        // this.person$ = this.store.select('person');

        // Utilizando seletor criado em index
        this.person$ = this.store.select(selectPerson);
        this.personCount$ = this.store.select(selectPersonCount);
        this.personLast$ = this.store.select(selectPersonLast);
        this.personCountAge$ = this.store.select(selectPersonCountAge);
    }

    addNew() {
        const person: Person = {
            name: faker.name.findName(),
            address: faker.address.streetAddress(),
            city: faker.address.city(),
            country: faker.address.country(),
            age: Math.round(Math.random() * 100),
            _id: uuidv4()
        };
        this.store.dispatch(new PersonNew({ person }));
    }

    update(p: Person) {
        // const p: Person = Object.assign({}, person);
        // p.address = faker.address.streetAddress();
        // p.city = faker.address.city();
        // p.country = faker.address.country();
        // p.age = Math.round(Math.random() * 100);
        const person = {
            ...p,
            address: faker.address.streetAddress(),
            city: faker.address.city(),
            country: faker.address.country(),
            age: Math.round(Math.random() * 100),
        };
        this.store.dispatch(new PersonUpdate({ person }));
    }

    delete(p: Person) {
        this.store.dispatch(new PersonDelete({ id: p._id as string }));
    }

}
