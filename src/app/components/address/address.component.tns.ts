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

  onFocusSearchBar(focusState:boolean) {
    const searchBar: TextField = <TextField>this.searchBar.nativeElement;

    if(focusState) {
      console.log('focus...');
      this.showRecentSearch = true;
    } else {
      console.log('unfocus...');
      this.showRecentSearch = false;
      searchBar.dismissSoftInput();
    }
  }

  @ViewChild("searchBar") searchBar: ElementRef;
  ngOnInit() {
    const searchBar: TextField = <TextField>this.searchBar.nativeElement;

    setTimeout(() => {
      searchBar.focus();
      this.showRecentSearch = true;
    }, 500);
  }
}
