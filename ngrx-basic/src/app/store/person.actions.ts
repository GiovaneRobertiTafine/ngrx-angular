import { inject } from "@angular/core";
import { Action } from "@ngrx/store";
import { Person } from "../models/person.model";

export enum PersonActionTypes {
    PERSON_ALL = '[PERSON_ALL] Get all people',
    PERSON_NEW = '[PERSON_NEW] Add a new person',
    PERSON_UPDATE = '[PERSON_UPDATE] Update a person',
    PERSON_DELETE = '[PERSON_DELETE] Delete a person',
    PERSON_INITIAL = '[PERSON_INITiAL] Get all people server'
}

export class PersonAll implements Action {
    readonly type: string = PersonActionTypes.PERSON_ALL;
}

export class PersonNew implements Action {
    readonly type: string = PersonActionTypes.PERSON_NEW;
    constructor(public payload: { person: Person; }) { }
}

export class PersonUpdate implements Action {
    readonly type: string = PersonActionTypes.PERSON_UPDATE;
    constructor(public payload: { person: Person; }) { }
}

export class PersonDelete implements Action {
    readonly type: string = PersonActionTypes.PERSON_DELETE;
    constructor(public payload: { id: string; }) { }
}

export type PersonActions = PersonAll | PersonNew | PersonUpdate | PersonDelete;