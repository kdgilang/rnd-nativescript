import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TabComponent } from './components/tab/tab.component';
import { FeatureComponent } from './components/feature/feature.component';
import { BannerComponent } from './components/banner/banner.component';
import { AddressComponent } from './components/address/address.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ListComponent } from './components/list/list.component';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { CustomOrderDialogComponent } from './components/custom-order-dialog/custom-order-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TabComponent,
    FeatureComponent,
    BannerComponent,
    AddressComponent,
    CatalogComponent,
    ListComponent,
    CustomOrderDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    ModalDialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
