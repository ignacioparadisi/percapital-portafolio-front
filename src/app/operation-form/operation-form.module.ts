import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationFormRoutingModule } from './operation-form-routing.module';
import { OperationFormComponent } from './operation-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    OperationFormComponent
  ],
  imports: [
    CommonModule,
    OperationFormRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatAutocompleteModule
  ]
})
export class OperationFormModule { }
