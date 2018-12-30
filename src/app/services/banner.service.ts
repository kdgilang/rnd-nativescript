import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  banners = new Array();
  private bannerCollection;

  constructor(private fireapp: FirebaseService) {
    
  }

  getBanners() {
    return new Observable(observer => {
      this.fireapp.getConnection().then((res) => {
        if(res) {
          this.bannerCollection = this.fireapp.Firebase.firestore().collection("promotions");
          this.bannerCollection.get().then(data => {
            if(data.docSnapshots.length > 0) {
              data.forEach(doc => {
                this.banners.push(doc.data());
              });
              observer.next(this.banners);
            } else {
              observer.error();
            }
          });
        }
      });
    });
  }
}
