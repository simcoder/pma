import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from './data/services/app.service';
@Injectable()
export class AppGuardService implements CanActivate {
  constructor( public router: Router, private appService: AppService) {}
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
     const uuid = route.paramMap.has("uuid") ? route.paramMap.get('uuid') : null;
    return this.appService.getUserById(uuid).pipe(
        map( (user)=>{
         if(user && !user.role) {
           return this.router.parseUrl(`secure/registration`)
         }
         return true;
        })
    )
  }
}