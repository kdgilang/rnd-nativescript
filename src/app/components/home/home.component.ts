import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'KFC';
	private user: any;
  constructor(private userService: UserService) { 
  }

  ngOnInit() {
  	this.userService.getUser().subscribe(user => {
  		this.user = user;
  	});
  }
}
