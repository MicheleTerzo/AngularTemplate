import {Routes} from '@angular/router';
import {HomeComponent} from './app/components/home/home.component';

export const MAIN_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  }
];
