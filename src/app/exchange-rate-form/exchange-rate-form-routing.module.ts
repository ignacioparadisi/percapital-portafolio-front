import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeRateFormComponent } from './exchange-rate-form.component';

const routes: Routes = [
  { path: '', component: ExchangeRateFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExchangeRateFormRoutingModule { }
