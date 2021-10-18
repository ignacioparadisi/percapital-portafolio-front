import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriceRvFormRoutingModule } from './price-rv-form-routing.module';
import { PriceRvFormComponent } from './price-rv-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    PriceRvFormComponent
  ],
  imports: [
    CommonModule,
    PriceRvFormRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class PriceRvFormModule { }
