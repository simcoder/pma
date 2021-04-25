import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { AuthActionTypes, UserLoginSuccess } from '../actions/auth.actions';
//import all requried services or any dependencies

@Injectable()
export class AuthEffects {
    constructor(private action$: Actions, private service: AuthService, private store: Store<any>) { }

    @Effect({dispatch:false})
    loginUser$ = this.action$.pipe(
        ofType(AuthActionTypes.USER_LOGIN),
        switchMap(() => {
            return this.service.getAuth().pipe(
                map(data => {
                    this.store.dispatch(new UserLoginSuccess(data));
                    return
                }),
                catchError(error => {
                    return of(error);
                })
            );
        })
    );
}