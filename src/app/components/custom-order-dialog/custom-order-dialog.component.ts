import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
  selector: 'app-custom-order-dialog',
  templateUrl: './custom-order-dialog.component.html',
  styleUrls: ['./custom-order-dialog.component.scss']
})
export class CustomOrderDialogComponent implements OnInit {

  @ViewChild('customorderTextview') customorderTextviewRef: ElementRef;
  public customNotes: string;

  constructor(private dialog: ModalDialogParams) { }

  ngOnInit() {
    this.customNotes = this.dialog.context;
    this.customorderTextviewRef.nativeElement.focus();
  }

  close(commitChanges: boolean) {
    if (commitChanges) {
      this.dialog.closeCallback(this.customNotes);
    } else {
      this.dialog.closeCallback(this.dialog.context);
    }
  }

}
