import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PriceRvFormComponent } from './price-rv-form.component';

const routes: Routes = [
  { path: '', component: PriceRvFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriceRvFormRoutingModule { }
