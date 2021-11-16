import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConstantValueFormRoutingModule } from './constant-value-form-routing.module';
import { ConstantValueFormComponent } from './constant-value-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    ConstantValueFormComponent
  ],
  imports: [
    CommonModule,
    ConstantValueFormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class ConstantValueFormModule { }
