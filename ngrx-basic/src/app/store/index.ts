import { ActionReducerMap } from "@ngrx/store";
import { Person } from "../models/person.model";
import * as fromPersonReducer from './person.reducer';

export interface AppState {
    person: Person[];
}

export const appReducers: ActionReducerMap<AppState> = {
    person: fromPersonReducer.reducer
};