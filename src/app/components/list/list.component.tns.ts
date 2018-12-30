import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

// temp service
class Post {
  constructor(public name: string) { }
}

let orderCarte = ["Paket Mantap", "Chicken Big Burger", "Spicy Chicken Original"];

// end temp service
  
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  public orders: Array<Post>;

  constructor() { }

  public onItemTap(args) {
      console.log("Item Tapped at cell index: " + args.index);
  }
  
  ngOnInit() {
    this.orders = [];

    for (let i = 0; i < orderCarte.length; i++) {
        this.orders.push(new Post(orderCarte[i]));
    }
  }

}
