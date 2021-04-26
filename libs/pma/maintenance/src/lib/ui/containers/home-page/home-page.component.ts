import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CreateTicket } from '../../../data/store/actions/maintenance.actions';

@Component({
  selector: 'pma-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  constructor(private store: Store<any>) {}
  onTicketSubmit(payload: FormGroup) {
    this.store.dispatch(
      new CreateTicket({
        type: payload.controls['type'].value,
        pics: payload.controls['pics'].value,
        additionalInfo: payload.controls['additionalInfo'].value,
      })
    );
  }
}
