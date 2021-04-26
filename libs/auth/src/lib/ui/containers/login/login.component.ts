import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { UserLogin, UserLoginSuccess } from '../../../data/store';

@Component({
  selector: 'pma-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  providers = AuthProvider;
  defaultTheme = "my-theme";
  constructor(
    private router: Router,
    private store: Store<any>
  ) {}
  onSuccess(user: any) {
    this.store.dispatch(new UserLoginSuccess(user))
    this.router.navigate([`secure/dashboard/${user.uid}`]);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onError(event) {
  }

}
