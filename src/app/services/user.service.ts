import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserModel } from '../models/user.model';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: UserModel;
	private userCollection;
  
  constructor(private fireapp: FirebaseService) {

  }

	getUser() {
    return new Observable(observer => {
      this.fireapp.getConnection().then((res) => {
        if(res) {
          this.userCollection = this.fireapp.Firebase.firestore().collection("users");
          this.userCollection.limit(1).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              this.user = doc.data();
            });
            if(this.user) {
              observer.next(this.user);
            } else {
              observer.error();
            }
          });
        }
      });
    });
    // firebase.getValue('/users')
    //       .then(result => console.log(JSON.stringify(result)))
    //       .catch(error => console.log("Error: " + error));  	
  }
}
