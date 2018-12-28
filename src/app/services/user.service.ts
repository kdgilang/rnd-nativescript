import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as firebase from 'nativescript-plugin-firebase/app';
import { environment } from '../../environments/environment';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: UserModel;
	private userCollection;
  
  constructor() {
    firebase.initializeApp({
      persist: false
    });
    this.userCollection = firebase.firestore().collection("users");
  }
	getUser() {
    return new Observable(observer => {
      this.userCollection.limit(1).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.user = doc.data();
        });
        observer.next(this.user);
      });
    });
    // firebase.getValue('/users')
    //       .then(result => console.log(JSON.stringify(result)))
    //       .catch(error => console.log("Error: " + error));  	
  }
}
