import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  // {
  //     path: '',
  //     redirectTo: 'testcomp',
  //     pathMatch: 'full',
  // },
  {
      path: 'front',
      children: [
      	{
      		path: 'home',
      		component: HomeComponent,
      	}
      ]
  },
];