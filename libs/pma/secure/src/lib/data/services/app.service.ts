import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import _ from 'lodash';

export const transformSideMenu = (snapshot:any, role : string) : any[]=>{
  const result: any[] = [];
  snapshot.docs.forEach(item => {
      if (item.exists) {
        const menuData = item.data();
        //only include role base specific modulesx
        if(menuData.role.includes(role)){
          const route = [{ outlets: { details: [menuData.route] } }];
          result.push({ order: menuData.order, name: menuData.name, route, selectedClass: menuData.selectedClass,icon:menuData.icon ,featureFlag: menuData.featureFlag });
        }
      }
    });
    const sortedMenuItems = _.sortBy(result, 'order');
return sortedMenuItems
}
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private db: AngularFirestore) { }

  getAppMenu(role: any): Observable<any> {
    return this.db
      .collection("menus")
      .get()
      .pipe(
        map(snapshot => {
          return transformSideMenu(snapshot, role);
        }),
        catchError((error: any) => Observable.throw(error.json()))
      );
  }

}
