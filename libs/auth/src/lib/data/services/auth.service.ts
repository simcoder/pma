import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private afAuth: AngularFireAuth) { }
   getAuth():Observable<any>{
     return this.afAuth.authState;
   }
}
