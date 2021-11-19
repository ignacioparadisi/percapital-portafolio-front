import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConstantTypeListRoutingModule } from './constant-type-list-routing.module';
import { ConstantTypeListComponent } from './constant-type-list.component';
import { ConstantValueFormModule } from '../constant-value-form/constant-value-form.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ConstantTypeListComponent
  ],
  imports: [
    CommonModule,
    ConstantTypeListRoutingModule,
    ConstantValueFormModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class ConstantTypeListModule { }
