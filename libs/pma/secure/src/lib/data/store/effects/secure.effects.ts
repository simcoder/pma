import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  LoadAppMenuFailure,
  LoadAppMenuSuccess,
  SecureActionTypes,
  UpdateTenant,
  UpdateTenantFailure,
  UpdateTenantSuccess,
  UpdateUser,
  UpdateUserFailure,
  UpdateUserSuccess,
} from '../actions/secure.actions';
import { AppService } from '../../services/app.service';
import { EMPTY, of } from 'rxjs';
import {  Store } from '@ngrx/store';
import { Router } from '@angular/router';
//import all requried services or any dependencies

@Injectable()
export class SecureEffects {
  constructor(
    private action$: Actions,
    private service: AppService,
    private store: Store<any>,
    private router: Router
  ) {}

  @Effect({ dispatch: false })
  effectName$ = this.action$.pipe(
    ofType(SecureActionTypes.LOAD_APP_MENU),
    switchMap(() => {
      return this.service.getAppMenu('resident').pipe(
        map((data) => {
          this.store.dispatch(new LoadAppMenuSuccess(data));
          return;
        }),
        catchError((error) => {
          this.store.dispatch(new LoadAppMenuFailure());
          return of(error);
        })
      );
    })
  );
  @Effect({ dispatch: false })
  updateUser$ = this.action$.pipe(
    ofType(SecureActionTypes.UPDATE_USER),
    switchMap((action: any) => {
      return this.service.updateUser(action.uuid, action.updatedUser).pipe(
        map((data) => {
          this.store.dispatch(new UpdateUserSuccess(data));
          this.router.navigate([`secure/dashboard/${action.uuid}`]);
          return EMPTY;
        }),
        catchError((error) => {
          this.store.dispatch(new UpdateUserFailure());
          return of(error);
        })
      );
    })
  );

  @Effect({ dispatch: false })
  updateTenant$ = this.action$.pipe(
    ofType(SecureActionTypes.UPDATE_TENANT),
    switchMap((action: any) => {
      return this.service.updateTenant(action.id, action.updatedTenant).pipe(
        map((data) => {
          this.store.dispatch(new UpdateTenantSuccess());
          return EMPTY;
        }),
        catchError((error) => {
          this.store.dispatch(new UpdateTenantFailure());
          return of(error);
        })
      );
    })
  );

  @Effect({ dispatch: false })
  linkTenant$ = this.action$.pipe(
    ofType(SecureActionTypes.LINK_TENANT_WITH_USER),
    switchMap((action: any) => {
      return this.service.getTenantById(action.tenantId).pipe(
        map((data:any) => {
         if(data){
            const linkedTenant = {...data, userId: action.uid}
            this.store.dispatch(new UpdateTenant(action.tenantId, linkedTenant));
            this.store.dispatch(new UpdateUser(action.uid, action.updatedUser));
         }
          return EMPTY;
        }),
        catchError((error) => {
          this.store.dispatch(new UpdateUserFailure());
          return of(error);
        })
      );
    })
  );   

}
