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
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatRippleModule} from "@angular/material/core";

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
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatRippleModule
  ]
})
export class PredictionDashboardModule { }
