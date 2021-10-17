import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PriceRvListComponent } from './price-rv-list.component';

const routes: Routes = [
  { path: '', component: PriceRvListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriceRvListRoutingModule { }
