import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  CreateTicketFailure,
  CreateTicketSuccess,
  MaintenanceActionTypes,
} from '../actions/maintenance.actions';
import { EMPTY, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';
import { selectAuthState } from '@pma/auth';


@Injectable()
export class MaintenanceEffects {
  constructor(
    private action$: Actions,
    private service: AppService,
    private store: Store<any>,
    private router: Router
  ) {}

  @Effect({ dispatch: false })
  createTicket$ = this.action$.pipe(
    ofType(MaintenanceActionTypes.CREATE_TICKET),
    withLatestFrom(this.store.select(selectAuthState)),
    switchMap(([action, user]:any) => {
      const payload = {...action.ticket, userId: user.login.uid};
      return this.service.createTicket(payload).pipe(
        map(() => {
          this.store.dispatch(new CreateTicketSuccess());
        }),
        catchError((error) => {
          this.store.dispatch(new CreateTicketFailure());
          return of(error);
        })
      );
    })
  );

  @Effect({ dispatch: false })
  createTicketSuccess$ = this.action$.pipe(
    ofType(MaintenanceActionTypes.CREATE_TICKET_SUCCESS),
    withLatestFrom(this.store.select(selectAuthState)),
    switchMap(([action, user]) => {
      this.router.navigate([`/secure/dashboard`])
      return EMPTY;
    })
  );
}
