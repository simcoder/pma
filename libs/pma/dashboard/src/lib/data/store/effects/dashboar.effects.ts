import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import {  Store } from '@ngrx/store';
import { DashboardActionTypes, LoadTenantFailure, LoadTenantSuccess } from '../actions/dashboard.actions';
import { AppService } from '../../services/app.service';
import { selectAuthState } from '@pma/auth';

@Injectable()
export class DashboardEffects {
  constructor(
    private action$: Actions,
    private service: AppService,
    private store: Store<any>,
  ) {}

  @Effect({ dispatch: false })
  effectName$ = this.action$.pipe(
    ofType(DashboardActionTypes.LOAD_TENTANT),
    withLatestFrom(this.store.select(selectAuthState)),
    switchMap(([action, user]) => {
      return this.service.findTenantByUserId(user.login.uid).pipe(
        map((data: any) => {
          if(data){
           this.store.dispatch(new LoadTenantSuccess(data));
          }
          
          return;
        }),
        catchError((error) => {
          this.store.dispatch(new LoadTenantFailure());
          return of(error);
        })
      );
    })
  );

 

}
