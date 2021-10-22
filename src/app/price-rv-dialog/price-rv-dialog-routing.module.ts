import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PriceRvDialogComponent } from './price-rv-dialog.component';

const routes: Routes = [
  { path: '', component: PriceRvDialogComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriceRvDialogRoutingModule { }
