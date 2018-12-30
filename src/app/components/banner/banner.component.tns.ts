import { Component, OnInit } from '@angular/core';
import { BannerService } from '../../services/banner.service';
 
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  private banners: any;

  constructor(private bannerService: BannerService) { 

  }

  ngOnInit() {
  	this.bannerService.getBanners().subscribe(banners => {
  		this.banners = banners;
  	}, (err) => {
  		console.log('connection error.');
  	});
  }
}
