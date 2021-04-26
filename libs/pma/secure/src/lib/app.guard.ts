import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  UrlTree,
  ActivatedRouteSnapshot,
  ActivatedRoute,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AuthService, selectAuthState } from '@pma/auth';
import { Observable } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AppService } from './data/services/app.service';
@Injectable()
export class AppDashboardGuardService implements CanActivate {
  constructor(public router: Router, private appService: AppService) {}
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const uuid = route.paramMap.has('uuid') ? route.paramMap.get('uuid') : null;
    return this.appService.getUserById(uuid).pipe(
      map((user) => {
        if (user && !user.role) {
          return this.router.parseUrl(`secure/registration`);
        } else {
          return this.router.parseUrl(`secure/dashboard`);
        }
      })
    );
  }
}
