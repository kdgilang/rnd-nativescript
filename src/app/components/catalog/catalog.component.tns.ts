import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  private titleBar: string;
  private selectedTab: number;

  constructor(private page: Page, private routerEx: RouterExtensions) {
  	page.actionBarHidden = true;
  	this.titleBar = 'Order';
  	this.selectedTab = 0;
  }

  selectTab(index) {
  	this.selectedTab = index;
  }

  goBack() {
  	this.routerEx.backToPreviousPage();
  }

  ngOnInit() {
  }
}
