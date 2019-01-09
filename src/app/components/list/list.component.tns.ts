import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CatalogModel } from '../../models/catalog.model';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  public catalog: any;
  private isCatalogLoaded: boolean = false;
  private showCart: boolean = false;
  private totalItem: number = 0;
  private totalPrice: number = 0;
  private dataCatalog: any = {
    btn: [],
    qty: [],
  };

  constructor(private catalogService: CatalogService, private route: ActivatedRoute) {
  
  }

  onMinus(i) {
    if(this.dataCatalog.qty[i] > 0) {
      this.dataCatalog.qty[i] --;
      this.totalItem --;
      this.totalPrice = this.totalPrice - parseInt(this.catalog[i].price[0]);
    }
    if(this.dataCatalog.qty[i] <= 0) {
      this.dataCatalog.btn[i] = false;
    }
    if(this.totalItem < 1) {
      this.showCart = false;
    }
  }

  onPlus(i) {
    this.dataCatalog.qty[i] ++;
    this.totalItem ++;
    this.totalPrice = this.totalPrice + parseInt(this.catalog[i].price[0]);
  }

  onAdd(i) {
    this.showCart = true;
    this.dataCatalog.btn[i] = true;
    this.dataCatalog.qty[i] ++;
    this.totalItem ++;
    this.totalPrice = this.totalPrice + parseInt(this.catalog[i].price[0]);
  }
  
  ngOnInit() {
    this.isCatalogLoaded = false;
    this.route.params.forEach(params => {
      const key = params['key'];
      this.catalogService.getCatalog(key).subscribe(catalog => {
        this.catalog = catalog;
        this.catalog.forEach((v, i) => {
          this.dataCatalog.btn[i] = false;
          this.dataCatalog.qty[i] = 0;
        });
        this.isCatalogLoaded = true;
      }, (err) => {
        console.log('connection error!');
      });
    });
  }
}
