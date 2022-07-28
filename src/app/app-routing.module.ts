import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { User } from 'src/common/classes/User';
import { AuthGuard, LoginGuard } from 'src/resources/auth-guard';
import { PortfolioComponent } from './portfolio/portfolio.component';

const routes: Routes = [
  { path: '', redirectTo: 'portfolio', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'portfolio', component: PortfolioComponent, canActivate: [LoginGuard] },
  { path: 'titles', loadChildren: () => import('./title-list/title-list.module').then(m => m.TitleListModule), canActivate: [LoginGuard, AuthGuard], data: { role: User.ROLE_ADMIN } },
  { path: 'exchange-rates', loadChildren: () => import('./exchange-rate-list/exchange-rate-list.module').then(m => m.ExchangeRateListModule), canActivate: [LoginGuard, AuthGuard], data: { role: User.ROLE_ADMIN } },
  { path: 'price-rv', loadChildren: () => import('./price-rv-list/price-rv-list.module').then(m => m.PriceRvListModule), canActivate: [LoginGuard, AuthGuard], data: { role: User.ROLE_ADMIN } },
  { path: 'buy-operations', loadChildren: () => import('./operation-buy-list/operation-buy-list.module').then(m => m.OperationBuyListModule), canActivate: [LoginGuard] },
  { path: 'sell-operations', loadChildren: () => import('./operation-sell-list/operation-sell-list.module').then(m => m.OperationSellListModule), canActivate: [LoginGuard] },
  { path: 'comissions', loadChildren: () => import('./constant-type-list/constant-type-list.module').then(m => m.ConstantTypeListModule), canActivate: [LoginGuard, AuthGuard], data: { role: User.ROLE_ADMIN } },
  { path: 'prediction', loadChildren: () => import('./prediction-dashboard/prediction-dashboard.module').then(m => m.PredictionDashboardModule), canActivate: [LoginGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
