import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

constructor(private db: AngularFirestore) { }

findTenantByUserId(userId: string){

  return this.db
    .collection("tenants")
    .get()
    .pipe(
      map(snapshots => {
        let resul;
        snapshots.docs.forEach((item: any) => {
          const i = item.data();
          if(i.userId === userId){
            resul = i;
          }
        })
        return resul;
      }),
      catchError((error: any) => Observable.throw(error.json()))
    );
}

}
