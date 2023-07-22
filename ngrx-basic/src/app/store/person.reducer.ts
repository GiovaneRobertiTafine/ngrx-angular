import { EntityAdapter, EntityState, IdSelector, createEntityAdapter } from "@ngrx/entity";
import { Person } from "../models/person.model";
import { PersonActionEntityTypes, PersonActions, PersonActionsEntity, PersonActionTypes, PersonAll, PersonDelete, PersonDeleteEntity, PersonNew, PersonNewEntity, PersonUpdate, PersonUpdateEntity } from "./person.actions";

export const initialState: Person[] = [];

export function reducer(state = initialState, action: PersonActions) {
    console.warn(action.type);
    switch (action.type) {
        case PersonActionTypes.PERSON_ALL:
            return state;
        case PersonActionTypes.PERSON_DELETE:
            return state.filter((p) => p._id !== (action as PersonDelete).payload.id);
        case PersonActionTypes.PERSON_NEW:
            return state.concat([(action as PersonNew).payload.person]);
        case PersonActionTypes.PERSON_UPDATE:
            const people = state.slice();
            const i = people.findIndex((p) => p._id === (action as PersonUpdate).payload.person._id);
            if (i >= 0) {
                people[i] = (action as PersonUpdate).payload.person;
            }
            return people;
        default:
            return state;
    }
}

// Bloco de Código abaixo com a mesma função acima utilizando Entity

export interface PeopleState extends EntityState<Person> {

}

export const peopleAdapter: EntityAdapter<Person> = createEntityAdapter<Person>({ selectId: ((person) => person._id) as IdSelector<Person> });

export const initialStateEntity: PeopleState = peopleAdapter.getInitialState({});

export function reducerEntity(state = initialStateEntity, action: PersonActionsEntity) {
    console.log(action.type);
    switch (action.type) {
        case PersonActionEntityTypes.PERSON_DELETE:
            return peopleAdapter.removeOne((action as PersonDeleteEntity).payload.id, state);
        case PersonActionEntityTypes.PERSON_NEW:
            return peopleAdapter.addOne((action as PersonNewEntity).payload.person, state);
        case PersonActionEntityTypes.PERSON_UPDATE:
            return peopleAdapter.updateOne({ id: (action as PersonUpdateEntity).payload.id, changes: (action as PersonUpdateEntity).payload.changes }, state);
        default:
            return state;
    }
}