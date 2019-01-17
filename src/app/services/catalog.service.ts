import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CatalogModel } from '../models/catalog.model';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private catalogCollection;
  private catalog: CatalogModel[];

  constructor(private fireapp: FirebaseService) { }

  getCatalog(key) {
    return new Observable<CatalogModel[]>(observer => {
      this.fireapp.getConnection().then((res) => {
        if (res) {
          this.catalog = [];
          this.catalogCollection = this.fireapp.Firebase.firestore().collection('catalog');
          this.catalogCollection.where('category', '==', key).get().then(data => {
            if (data.docSnapshots.length > 0) {
              data.forEach(doc => {
                this.catalog.push({
                  id: doc.id,
                  ...doc.data(),
                  quantity: 0,
                  custom: ''
                });
              });
              observer.next(this.catalog);
            } else {
              observer.error();
            }
          });
        }
      });
    });
  }
}
