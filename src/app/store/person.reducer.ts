import { Person } from "../models/person.model";
import { PersonActions, PersonActionTypes, PersonDelete, PersonInitial, PersonNew, PersonUpdate } from "./person.actions";

export const initialState: Person[] = [];

export function reducer(state = initialState, action: PersonActions) {
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
        case PersonActionTypes.PERSON_INITIAL:
            return state.concat([...(action as PersonInitial).payload.persons]);
        default:
            return state;
    }
}