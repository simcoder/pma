import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LoadAppMenuFailure, LoadAppMenuSuccess, SecureActionTypes } from '../actions/secure.actions';
import { AppService } from '../../services/app.service';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
//import all requried services or any dependencies

@Injectable()
export class SecureEffects {
    constructor(private action$: Actions, private service: AppService, private store: Store<any>) { }

    @Effect({dispatch:false})
    effectName$ = this.action$.pipe(
        ofType(SecureActionTypes.LOAD_APP_MENU),
        switchMap(() => {
            return this.service.getAppMenu('resident').pipe(
                map(data => {
                    this.store.dispatch(new LoadAppMenuSuccess(data));
                    return
                }),
                catchError(error => {
                    this.store.dispatch(new LoadAppMenuFailure())
                    return of(error);
                })
            );
        })
    );
}