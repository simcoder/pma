import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }
   getAuth():Observable<any>{
     return this.afAuth.authState;
   }

  //  getUserById(userUUID: string): Observable<any>{
  //   return this.db
  //     .collection("users")
  //     .doc(userUUID)
  //     .get()
  //     .pipe(
  //       map(resp => {
  //         return resp.data();
  //       }),
  //       catchError((error: any) => Observable.throw(error.json()))
  //     );
  // }
}
