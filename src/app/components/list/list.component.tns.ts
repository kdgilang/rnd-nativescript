import { Component, OnInit, ChangeDetectionStrategy, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CatalogModel } from '../../models/catalog.model';
import { CatalogService } from '../../services/catalog.service';
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/modal-dialog';
import { CustomOrderDialogComponent } from '../custom-order-dialog/custom-order-dialog.component';

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
  private categoryCatalog: number = 0;
  private dataCatalog: any = [
    {
      btn: [],
      qty: [],
    },
    {
      btn: [],
      qty: [],
    },
    {
      btn: [],
      qty: [],
    },
    {
      btn: [],
      qty: [],
    },
  ];

  constructor(
    private catalogService: CatalogService,
    private route: ActivatedRoute,
    private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef
  ) {
    this.route.queryParams.subscribe(params => {
      this.isCatalogLoaded = false;
      this.categoryCatalog = params.selectedTab;
    });
  }

  onMinus(i) {
    if(this.dataCatalog[this.categoryCatalog].qty[i] > 0) {
      this.dataCatalog[this.categoryCatalog].qty[i] --;
      this.totalItem --;
      this.totalPrice = this.totalPrice - parseInt(this.catalog[i].price[0]);
    }
    if(this.dataCatalog[this.categoryCatalog].qty[i] <= 0) {
      this.dataCatalog[this.categoryCatalog].btn[i] = false;
    }
    if(this.totalItem < 1) {
      this.showCart = false;
    }
  }

  onPlus(i) {
    this.dataCatalog[this.categoryCatalog].qty[i] ++;
    this.totalItem ++;
    this.totalPrice = this.totalPrice + parseInt(this.catalog[i].price[0]);
  }

  onAdd(i) {
    this.showCart = true;
    this.dataCatalog[this.categoryCatalog].btn[i] = true;
    this.dataCatalog[this.categoryCatalog].qty[i] = 1;
    this.totalItem ++;
    this.totalPrice = this.totalPrice + parseInt(this.catalog[i].price[0]);
  }

  onCustom(i) {
    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef
    };
    this.modalService.showModal(CustomOrderDialogComponent, options);
  }
  
  ngOnInit() {
    this.isCatalogLoaded = false;

    this.route.params.forEach(params => {
      const key = params['key'];
      this.catalogService.getCatalog(key).subscribe(catalog => {
        this.catalog = catalog;
        setTimeout(() => {
          this.isCatalogLoaded = true;
        }, 1000);
      }, (err) => {
        console.log('connection error!');
      });
    });
  }
}
