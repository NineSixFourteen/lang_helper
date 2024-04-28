import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeComponent as HomeComponentG } from '../games/home/home.component';
import { HomeComponent as HomeComponentL } from '../learn/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'games', component: HomeComponentG },
  { path: 'learn', component: HomeComponentL },
];
