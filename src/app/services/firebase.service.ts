import { Injectable } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  Firebase: any;
  constructor() {
  	
  }
  getConnection() {
  	return new Promise((res, rej) => {
  		if(typeof this.Firebase === 'object') {
  			res(1);
  		} else {
  			this.Firebase = firebase;
		  	this.Firebase.initializeApp({
		      persist: false
		    }).then(()=> {
		    	res(1);
		    }, (error) => {
		    	rej(error);
		    });  		
		}
  	});
  }
}
