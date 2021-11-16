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


@NgModule({
  declarations: [
    ConstantTypeListComponent
  ],
  imports: [
    CommonModule,
    ConstantTypeListRoutingModule,
    ConstantValueFormModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ]
})
export class ConstantTypeListModule { }
