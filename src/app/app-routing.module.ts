import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './portfolio/portfolio.component';

const routes: Routes = [
  { path: '', redirectTo: 'portfolio', pathMatch: 'full' },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'titles', loadChildren: () => import('./title-list/title-list.module').then(m => m.TitleListModule) },
  { path: 'exchange-rates', loadChildren: () => import('./exchange-rate-list/exchange-rate-list.module').then(m => m.ExchangeRateListModule) },
  { path: 'price-rv', loadChildren: () => import('./price-rv-list/price-rv-list.module').then(m => m.PriceRvListModule) },
  { path: 'buy-operations', loadChildren: () => import('./operation-buy-list/operation-buy-list.module').then(m => m.OperationBuyListModule) },
  { path: 'sell-operations', loadChildren: () => import('./operation-sell-list/operation-sell-list.module').then(m => m.OperationSellListModule) },
  { path: 'comissions', loadChildren: () => import('./constant-type-list/constant-type-list.module').then(m => m.ConstantTypeListModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
