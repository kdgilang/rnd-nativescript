import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {registerElement} from "nativescript-angular/element-registry";
import { Page } from 'tns-core-modules/ui/page';
import { RouterExtensions } from "nativescript-angular/router";
import { isIOS } from 'tns-core-modules/platform';
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';

registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  private titleBar: string;
  private showRecentSearch: boolean;
  private mapView: MapView;
  private latitude:number = -8.078873;
  private longitude:number = 115.170894;
  private zoom:number = 10;
  private bearing:number = 0;
  private tilt:number = 0;
  private lastCamera: String;

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
    const searchBar: TextField = <TextField>this.searchBarClonedRef.nativeElement;
    searchBar.focus();
    searchBar.dismissSoftInput();
  }

  ngOnInit() {
    const searchBar: TextField = <TextField>this.searchBarRef.nativeElement;
    setTimeout(() => {
      searchBar.focus();
      this.showRecentSearch = true;
    }, 500);
  }

  onMapReady(event) {
    console.log('Map Ready');

    this.mapView = event.object;

    console.log("Setting a marker...");

    var marker = new Marker();
    marker.position = Position.positionFromLatLng(-8.078873, 115.170894);
    marker.title = "Bungkulan";
    marker.snippet = "Bali";
    marker.userData = {index: 1};
    this.mapView.addMarker(marker);
  }
  
  onCoordinateTapped(args) {
    console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
  }

  onMarkerSelect(args) {
    console.log("Clicked on " +args.marker.title);
  }

  onCameraChanged(args) {
      console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
      this.lastCamera = JSON.stringify(args.camera);
  }

  onCameraMove(args) {
    console.log("Camera moving: " + JSON.stringify(args.camera));
  }
}
