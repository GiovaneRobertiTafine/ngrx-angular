import { Action, ActionReducer, ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import { Person } from "../models/person.model";
import * as fromPersonReducer from './person.reducer';

export interface AppState {
    persons?: Person[];
    personsEntity?: fromPersonReducer.PeopleState;
}

export const appReducers: ActionReducerMap<AppState> = {
    persons: fromPersonReducer.reducer
};

// Exemplo de criação de seletor
export const selectPerson = (state: AppState) => state.persons;

export const selectPersonCount = createSelector(
    selectPerson,
    (persons) => persons?.length
);

export const selectPersonLast = createSelector(
    selectPerson,
    selectPersonCount,
    (persons, n) => persons?.[--n!]
);

export const selectPersonCountAge = createSelector(
    selectPerson,
    (persons) => {
        let countAge = 0;
        persons?.forEach((p) => countAge += p.age);
        return countAge;
    }
);

// Bloco de Código abaixo com a mesma função acima utilizando Entity

export const appReducersEntity: ActionReducerMap<AppState> = {
    personsEntity: fromPersonReducer.reducerEntity as ActionReducer<fromPersonReducer.PeopleState | undefined, Action>
};

export const peopleState = createFeatureSelector<fromPersonReducer.PeopleState>('personsEntity');

export const { selectAll, selectIds, selectEntities, selectTotal } = fromPersonReducer.peopleAdapter.getSelectors(peopleState);