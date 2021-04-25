import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { UserLogin } from '@pma/auth';
import { Observable, of } from 'rxjs';
import {  filter, take, tap } from 'rxjs/operators';
import { LoadAppMenu } from './actions/secure.actions';
import { selectSecureState } from './selectors/secure.selectors';

@Injectable({
  providedIn: 'root',
})
export class SecureResolver implements Resolve<Observable<boolean>> {
  constructor(public store: Store<any>) {}
  resolve(): Observable<boolean> {
    return this.store.pipe(
      select(selectSecureState),
      tap((hasLoaded) => {
        this.store.dispatch(new UserLogin());
        if (!hasLoaded) {
          this.store.dispatch(new LoadAppMenu());
        }
      }),
      filter((hasLoaded) => hasLoaded),
      take(1)
    );
  }
}
