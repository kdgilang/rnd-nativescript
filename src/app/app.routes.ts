import { Routes } from '@angular/router';
import { TabComponent } from './components/tab/tab.component';
import { AddressComponent } from './components/address/address.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ListComponent } from './components/list/list.component';

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
    		component: TabComponent,
    	},
      {
        path: 'set-address',
        component: AddressComponent,
      },
      {
        path: 'catalog',
        component: CatalogComponent,
        children: [
          {
            path: 'list/:key',
            component: ListComponent,
          }
        ]
      }
    ],
  },
 ];