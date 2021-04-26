import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { CreateTicket } from '../../../data/store/actions/maintenance.actions';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { selectAuthState } from 'libs/auth/src/lib/data/store';


@Component({
  selector: 'pma-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  constructor(private store: Store<any>) {}
  authState$ = this.store.pipe(select(selectAuthState));

  onTicketSubmit(payload: FormGroup) {
    this.store.dispatch(
      new CreateTicket({
        type: payload.controls['type'].value,
        pics: payload.controls['pics'].value,
        additionalInfo: payload.controls['additionalInfo'].value,
        status: 'OPEN',
        tenantId: payload.controls['tenantId'].value
      })
    );
  }
}
