import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConstantTypeListComponent } from './constant-type-list.component';

const routes: Routes = [
  { path: '', component: ConstantTypeListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConstantTypeListRoutingModule { }
