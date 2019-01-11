import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { View } from 'tns-core-modules/ui/page/page';

@Component({
  selector: 'app-custom-order-dialog',
  templateUrl: './custom-order-dialog.component.html',
  styleUrls: ['./custom-order-dialog.component.scss']
})
export class CustomOrderDialogComponent implements OnInit {

  @ViewChild('customorderTextview') customorderTextviewRef: ElementRef;

  constructor(private dialog: ModalDialogParams) { }

  ngOnInit() {
    this.customorderTextviewRef.nativeElement.focus();
  }

  close(state: string) {
    this.dialog.closeCallback(state);
  }

}
