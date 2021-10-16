import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeRateListComponent } from './exchange-rate-list.component';

const routes: Routes = [
  { path: '', component: ExchangeRateListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExchangeRateListRoutingModule { }
