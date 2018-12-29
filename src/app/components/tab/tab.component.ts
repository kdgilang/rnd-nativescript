import { Component, OnInit } from '@angular/core';
import { alert } from "tns-core-modules/ui/dialogs";
import { SelectedIndexChangedEventData } from "tns-core-modules/ui/tab-view";
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {

    public tabSelectedIndex: number;

    constructor(private router: Router) {
        this.tabSelectedIndex = 0;
    }
    
    onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
        if (args.oldIndex !== -1) {
            this.tabSelectedIndex = args.newIndex;
            // if(this.tabSelectedIndex  === 0) {
            //     this.router.navigate(['front/home']);
            // } else if(this.tabSelectedIndex  === 1) {
            //     this.router.navigate(['']);
            // } else if(this.tabSelectedIndex  === 2) {
            //     this.router.navigate(['']);
            // }
        }
    }

	ngOnInit() {}
}
