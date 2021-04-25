import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { selectAuthState } from 'libs/auth/src/lib/data/store';
import { selectSecureState } from './data/store/selectors/secure.selectors';

@Component({
  selector: 'pma-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  authState$ = this.store.pipe(select(selectAuthState));
  secureState$ = this.store.pipe(select(selectSecureState));

  hamburger: any = faBars;
  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.secureState$.subscribe(x=>{
      console.log(x);
    })
  }

  onSignOut(){
    // do
  }

}
