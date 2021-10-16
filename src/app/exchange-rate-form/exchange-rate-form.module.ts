import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExchangeRateFormRoutingModule } from './exchange-rate-form-routing.module';
import { ExchangeRateFormComponent } from './exchange-rate-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    ExchangeRateFormComponent
  ],
  imports: [
    CommonModule,
    ExchangeRateFormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class ExchangeRateFormModule { }
