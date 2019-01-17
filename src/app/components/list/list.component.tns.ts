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

  public catalog: CatalogModel[] = [];
  public catalogsCart: CatalogModel[] = [];
  public isCatalogLoaded: boolean;

  constructor(
    private catalogService: CatalogService,
    private route: ActivatedRoute,
    private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef
  ) {
    this.route.queryParams.subscribe(params => {
      this.isCatalogLoaded = false;
    });
  }

  onMinus(id: string) {
    const selectedCartIndex = this.catalogsCart.findIndex(c => c.id === id);
    this.catalogsCart[selectedCartIndex].quantity -= 1;
    if (this.catalogsCart[selectedCartIndex].quantity < 1) {
      this.catalogsCart.splice(selectedCartIndex, 1);
    }
  }

  onPlus(id: string) {
    this.catalogsCart.find(c => c.id === id).quantity += 1;
  }

  onAdd(id: string) {
    const selectedCatalog = this.catalog.find(c => c.id === id);
    this.catalogsCart.push(selectedCatalog);
    const existingCatalog = this.catalogsCart.find(c => c.id === id);
    existingCatalog.quantity += 1;
  }

  onCustom(id: string) {
    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef
    };
    this.modalService.showModal(CustomOrderDialogComponent, options);
  }

  isAddButtonVisible(id: string): boolean {
    const selectedCatalog = this.catalogsCart.find(c => c.id === id);
    if (!selectedCatalog) {
      return true;
    } else if (selectedCatalog.quantity < 1) {
      return true;
    } else {
      return false;
    }
  }

  isCartButtonShow(): boolean {
    return this.catalogsCart.length > 0;
  }

  getTotalPrice(): number {
    return this.catalogsCart.map(c => parseInt(c.price[0], 10) * c.quantity)
      .reduce((a, b) => a + b, 0);
  }

  getTotalQuantity(): number {
    return this.catalogsCart.map(c => c.quantity)
    .reduce((a, b) => a + b, 0);
  }

  getItemQuantity(id: string): number {
    const selectedCatalog = this.catalogsCart.find(c => c.id === id);
    if (selectedCatalog) {
      return selectedCatalog.quantity;
    } else {
      return 0;
    }
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
