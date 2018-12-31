import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CatalogModel } from '../models/catalog.model';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
	private catalogCollection;
	private catalog: any;

  constructor(private fireapp: FirebaseService) { }

 	getCatalog(key) {
    return new Observable(observer => {
      this.fireapp.getConnection().then((res) => {
        if(res) {
        	this.catalog = [];
          this.catalogCollection = this.fireapp.Firebase.firestore().collection("catalog");
          this.catalogCollection.where('category', '==', key).get().then(data => {
            if(data.docSnapshots.length > 0) {
	            data.forEach(doc => {
	              this.catalog.push(doc.data());
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
