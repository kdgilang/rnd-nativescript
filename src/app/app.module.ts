import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TabComponent } from './tab/tab.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TabComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFirestore,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
