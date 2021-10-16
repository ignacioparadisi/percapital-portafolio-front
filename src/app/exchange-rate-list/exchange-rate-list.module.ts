import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExchangeRateListRoutingModule } from './exchange-rate-list-routing.module';
import { ExchangeRateListComponent } from './exchange-rate-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ExchangeRateListComponent
  ],
  imports: [
    CommonModule,
    ExchangeRateListRoutingModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ]
})
export class ExchangeRateListModule { }
