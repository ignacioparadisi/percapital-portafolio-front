import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PredictionDashboardRoutingModule } from './prediction-dashboard-routing.module';
import { PredictionDashboardComponent } from './prediction-dashboard.component';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    PredictionDashboardComponent
  ],
  imports: [
    CommonModule,
    PredictionDashboardRoutingModule,
    PlotlyModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule
  ]
})
export class PredictionDashboardModule { }
