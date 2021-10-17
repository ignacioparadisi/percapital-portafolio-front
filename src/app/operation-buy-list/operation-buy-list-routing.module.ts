import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationBuyListComponent } from './operation-buy-list.component';

const routes: Routes = [
  { path: '', component: OperationBuyListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationBuyListRoutingModule { }
