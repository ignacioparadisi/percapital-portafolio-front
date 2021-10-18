import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationFormComponent } from './operation-form.component';

const routes: Routes = [
  { path: '', component: OperationFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationFormRoutingModule { }
