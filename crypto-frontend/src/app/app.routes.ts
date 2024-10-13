import { Routes } from '@angular/router';
import { CryptoDetailsComponent } from './crypto-details/crypto-details.component';
import { LiveDataComponent } from './live-data/live-data.component';

export const routes: Routes = [
  { path: 'main', component: CryptoDetailsComponent },
  { path: 'details/:id', component: LiveDataComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
];
