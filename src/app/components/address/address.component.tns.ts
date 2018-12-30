import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {registerElement} from "nativescript-angular/element-registry";
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';

registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  private mapView: MapView;
  private latitude:number = -8.078873;
  private longitude:number = 115.170894;
  private zoom:number = 10;
  private bearing:number = 0;
  private tilt:number = 0;
  private lastCamera: String;

  constructor() {
  
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
  
  ngOnInit() {
  }
}
