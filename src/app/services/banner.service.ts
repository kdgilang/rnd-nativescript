import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as firebase from 'nativescript-plugin-firebase/app';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  banners = new Array();
  private bannerCollection;

  constructor() {
    this.bannerCollection = firebase.firestore().collection("promotions");
  }
  getUser() {
    return new Observable(observer => {
      this.bannerCollection.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.banners.push(doc.data());
        });
        observer.next(this.banners);
      });
    });
  }
}
