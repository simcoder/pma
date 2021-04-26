import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { LoadTenant } from '../../../data/store/actions/dashboard.actions';
import { selectTenant } from '../../../data/store/selectors/dashboard.selectors';

@Component({
  selector: 'pma-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent  {
  tenant$ = this.store.pipe(select(selectTenant));
  constructor(private router: Router, private route: ActivatedRoute, private store:Store<any>){
    this.store.dispatch(new LoadTenant());
  }
  onMaintenanceClick(){
    this.router.navigate(["/secure/maintenance"],{relativeTo: this.route})
  }
}
