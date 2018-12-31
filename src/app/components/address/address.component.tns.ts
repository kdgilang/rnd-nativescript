import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';
import { RouterExtensions } from "nativescript-angular/router";
import { isIOS } from 'tns-core-modules/platform';
import {registerElement} from "nativescript-angular/element-registry";
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';

registerElement('MapView', () => MapView);

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})

export class AddressComponent implements OnInit {
  private titleBar: string;
  private showRecentSearch: boolean;
  private latitude =  -8.4548487;
  private longitude = 114.7900851;
  private zoom = 8;
  private minZoom = 0;
  private maxZoom = 22;
  private bearing = 0;
  private tilt = 0;
  private padding = [40, 40, 40, 40];

  private mapView: MapView;

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
    const searchBar = this.searchBarClonedRef.nativeElement;
    searchBar.focus();
    searchBar.dismissSoftInput();
  }

  //Map events
  onMapReady(event) {
      const marker = new Marker();
      this.mapView = event.object;
      marker.position = Position.positionFromLatLng(-8.370486, 115.1426651);
      marker.title = "Tabanan";
      marker.snippet = "Bali";
      marker.userData = {index: 1};
      this.mapView.addMarker(marker);
  }

  onCoordinateTapped(args) {
    // args.position.latitude 
    // args.position.longitude
  }

  onMarkerEvent(args) {
    // args.eventName 
    // args.marker.title 
    // ]args.marker.position.latitude 
    // args.marker.position.longitude, args
  }

  onCameraChanged(args) {
    const searchBar = this.searchBarClonedRef.nativeElement;
    searchBar.focus();
    searchBar.dismissSoftInput();
    this.lastCamera = JSON.stringify(args.camera);
  }

  onCameraMove(args) {
    // args.camera  
  }

  ngOnInit() {
    const searchBar = this.searchBarRef.nativeElement;
    setTimeout(() => {
      searchBar.focus();
      this.showRecentSearch = true;
    }, 500);
  }
}
