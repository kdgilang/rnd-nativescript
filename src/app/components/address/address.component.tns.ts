import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  private showRecentSearch: boolean;

  @ViewChild("searchbarCloned") searchBarClonedRef: ElementRef;
  @ViewChild("searchBar") searchBarRef: ElementRef;

  constructor(private page: Page, private routerEx: RouterExtensions) {
  	page.actionBarHidden = true;
    this.titleBar = 'Select Address';
    this.showRecentSearch = false;
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

  onFocus() {
    this.showRecentSearch = true;
  }

  onBlur() {
    this.showRecentSearch = false;
  }

  clearFocus() {
    const searchBar = this.searchBarClonedRef.nativeElement;
    searchBar.focus();
    searchBar.dismissSoftInput();
  }

  ngOnInit() {
    const searchBar = this.searchBarRef.nativeElement;
    setTimeout(() => {
      searchBar.focus();
      this.showRecentSearch = true;
    }, 500);
  }
}
