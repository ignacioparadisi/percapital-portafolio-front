import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriceRvDialogRoutingModule } from './price-rv-dialog-routing.module';
import { PriceRvDialogComponent } from './price-rv-dialog.component';
import { PriceRvListModule } from '../price-rv-list/price-rv-list.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    PriceRvDialogComponent
  ],
  imports: [
    CommonModule,
    PriceRvDialogRoutingModule,
    PriceRvListModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class PriceRvDialogModule { }
