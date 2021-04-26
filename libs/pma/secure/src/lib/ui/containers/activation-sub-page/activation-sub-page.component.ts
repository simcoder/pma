import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LinkTenantWithUser } from '../../../data/store/actions/secure.actions';
import { selectUser } from '../../../data/store/selectors/secure.selectors';

@Component({
  selector: 'pma-activation-sub-page',
  templateUrl: './activation-sub-page.component.html',
  styleUrls: ['./activation-sub-page.component.scss']
})
export class ActivationSubPageComponent  {

  constructor(private store: Store<any>) { 
  }
  user$ = this.store.pipe(select(selectUser));
  onActivateClick(payload){
    const updateUser = {
      ...payload.user,
      role: "tenant"
    }
    this.store.dispatch(new LinkTenantWithUser(updateUser.uid, updateUser, payload.form.controls["tenantId"].value));
  }

}
