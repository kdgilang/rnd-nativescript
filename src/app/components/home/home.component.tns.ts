import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Page } from 'tns-core-modules/ui/page';
import { UserModel } from '../../models/user.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
	private user: any;

  constructor(private userService: UserService, private page: Page) {
  	page.actionBarHidden = true;
    this.user = {
			name: '',
			nick_name: '',
			password: '',
			phone: '',
			point: 0,
		};
  }

  ngOnInit() {
  	this.userService.getUser().subscribe(user => {
      this.user = user;
    }, (err) => {
      console.log('connection error.');
    });
  }
}

