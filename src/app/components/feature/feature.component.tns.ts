import { Component, OnInit } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';
import { Router } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { isIOS } from 'tns-core-modules/platform';

registerElement('CardView', () => CardView);

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})

export class FeatureComponent implements OnInit {

  constructor(private routerEx: RouterExtensions) {}

  onDelivery() {
    this.routerEx.navigate(['front/set-address'],  {
      transition: {
          name: isIOS ?  "none" : "fade",
          duration: 300,
          curve: "linear",
      }
    });
  }

  ngOnInit() { }
}
