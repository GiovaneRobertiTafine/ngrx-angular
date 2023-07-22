import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Person } from './models/person.model';
import { AppState, selectPersonLast, selectPersonCount, selectPerson, selectPersonCountAge, selectAll, selectTotal } from './store';
import { PersonAll, PersonDelete, PersonDeleteEntity, PersonNew, PersonNewEntity, PersonUpdate, PersonUpdateEntity } from './store/person.actions';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    person$!: Observable<Person[] | undefined>;
    personCount$!: Observable<number | undefined>;
    personLast$!: Observable<any>;
    personCountAge$!: Observable<any>;

    personEntity$!: Observable<Person[]>;
    personCountEntity$!: Observable<number>;
    personLastEntity!: Person;
    personCountAgeEntity: number = 0;

    constructor(private store: Store<AppState>) { }

    ngOnInit(): void {
        this.store.dispatch(new PersonAll());
        // this.person$ = this.store.select('person');

        // Utilizando seletor criado em index
        this.person$ = this.store.select(selectPerson);
        this.personCount$ = this.store.select(selectPersonCount);
        this.personLast$ = this.store.select(selectPersonLast);
        this.personCountAge$ = this.store.select(selectPersonCountAge);

        this.personEntity$ = this.store.select(selectAll);
        this.personCountEntity$ = this.store.select(selectTotal);
        this.personEntity$.subscribe((p) => {
            this.personLastEntity = p[p.length - 1];
            this.personCountAgeEntity = 0;
            p.forEach((p) => this.personCountAgeEntity += p.age);
        });
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

    addNewEntity() {
        const person: Person = {
            name: faker.name.findName(),
            address: faker.address.streetAddress(),
            city: faker.address.city(),
            country: faker.address.country(),
            age: Math.round(Math.random() * 100),
            _id: uuidv4()
        };

        this.store.dispatch(new PersonNewEntity({ person }));
    }

    deleteEntity(p: Person) {
        this.store.dispatch(new PersonDeleteEntity({ id: p._id as string }));
    }

    updateEntity(p: Person) {
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
        this.store.dispatch(new PersonUpdateEntity({ id: p._id!, changes: person }));
    }

}
