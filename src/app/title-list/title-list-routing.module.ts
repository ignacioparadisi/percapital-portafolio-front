import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TitleListComponent } from './title-list.component';

const routes: Routes = [
  { path: '', component: TitleListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TitleListRoutingModule { }
