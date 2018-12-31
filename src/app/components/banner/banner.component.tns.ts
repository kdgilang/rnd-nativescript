import { Component, OnInit } from '@angular/core';
import { BannerService } from '../../services/banner.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  private banners: any;
  private showBanner: boolean = false;
  private showError: boolean = false;

  constructor(private bannerService: BannerService) { 

  }

  onLoad() {
    this.showBanner = true;
  }

  ngOnInit() {
  	this.bannerService.getBanners().subscribe(banners => {
  		this.banners = banners;
    }, (err) => {
  		console.log('connection error.');
      this.showBanner = true;
      this.showError = true;
  	});
  }
}
