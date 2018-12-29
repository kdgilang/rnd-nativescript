import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddressComponent } from './components/address/address.component';
import { CatalogComponent } from './components/catalog/catalog.component';

export const routes: Routes = [
  {
      path: '',
      redirectTo: 'front/home',
      pathMatch: 'full',
  },
  {
    path: 'front',
    children: [
    	{
    		path: 'home',
    		component: HomeComponent,
    	},
      {
        path: 'set-address',
        component: AddressComponent,
      },
      {
        path: 'catalog',
        component: CatalogComponent,
      }
    ],
  },
 ];