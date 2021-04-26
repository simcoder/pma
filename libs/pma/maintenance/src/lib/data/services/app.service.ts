import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

constructor(private db: AngularFirestore) { }

createTicket(ticket:any) {
  return from(this.db
    .collection("tickets")
    .add(ticket));
  }

}
