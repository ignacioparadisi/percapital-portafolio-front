import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './portfolio/portfolio.component';

const routes: Routes = [
  { path: '', redirectTo: 'portfolio', pathMatch: 'full' },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'titles', loadChildren: () => import('./title-list/title-list.module').then(m => m.TitleListModule) },
  { path: 'exchange-rates', loadChildren: () => import('./exchange-rate-list/exchange-rate-list.module').then(m => m.ExchangeRateListModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
