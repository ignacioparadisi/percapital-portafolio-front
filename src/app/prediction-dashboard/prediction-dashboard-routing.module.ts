import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PredictionDashboardComponent} from "./prediction-dashboard.component";

const routes: Routes = [
  { path: '', component: PredictionDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PredictionDashboardRoutingModule { }
