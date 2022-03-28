import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PredictionDashboardRoutingModule } from './prediction-dashboard-routing.module';
import { PredictionDashboardComponent } from './prediction-dashboard.component';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    PredictionDashboardComponent
  ],
  imports: [
    CommonModule,
    PredictionDashboardRoutingModule,
    PlotlyModule
  ]
})
export class PredictionDashboardModule { }
