import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { PersonComponent } from './person/person.component';
import { HttpClientModule } from '@angular/common/http';
import { Action, ActionReducer, ActionReducerMap, Store, StoreModule } from '@ngrx/store';
import { AppState, appReducers, appReducersEntity } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reduce } from 'rxjs';
import { reducer, reducerEntity } from './store/person.reducer';
import { Person } from './models/person.model';

export const reducers = {
    persons: appReducers,
    personsEntity: appReducersEntity
};

@NgModule({
    declarations: [
        AppComponent,
        PersonComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        // StoreModule.forRoot(appReducers),
        StoreModule.forRoot<AppState>({ persons: reducer, personsEntity: reducerEntity } as ActionReducerMap<AppState>, { initialState: {} }),
        StoreDevtoolsModule.instrument({
            maxAge: 25
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }


