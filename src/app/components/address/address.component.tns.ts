import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';
import { RouterExtensions } from "nativescript-angular/router";
import { isIOS } from 'tns-core-modules/platform';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  private titleBar: string;

  constructor(private page: Page, private routerEx: RouterExtensions) {
  	page.actionBarHidden = true;
  	this.titleBar = 'Select Address';
  }

  goBack() {
  	this.routerEx.backToPreviousPage();
  }

  goCatalog() {
  	this.routerEx.navigate(['front/catalog'], {
      transition: {
		name: isIOS ?  "none" : "fade",
		duration: 300,
		curve: "linear",
      }
  	})
  }

  ngOnInit() {
  }
}
