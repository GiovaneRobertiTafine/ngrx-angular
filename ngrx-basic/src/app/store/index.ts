import { ActionReducerMap, createSelector } from "@ngrx/store";
import { Person } from "../models/person.model";
import * as fromPersonReducer from './person.reducer';

export interface AppState {
    person: Person[];
}

export const appReducers: ActionReducerMap<AppState> = {
    person: fromPersonReducer.reducer
};


// Exemplo de criação de seletor
export const selectPerson = (state: AppState) => state.person;

export const selectPersonCount = createSelector(
    selectPerson,
    (person) => person.length
);

export const selectPersonLast = createSelector(
    selectPerson,
    selectPersonCount,
    (persons, n) => persons[--n]
);

export const selectPersonCountAge = createSelector(
    selectPerson,
    (persons) => {
        let countAge = 0;
        persons.forEach((p) => countAge += p.age);
        return countAge;
    }
);