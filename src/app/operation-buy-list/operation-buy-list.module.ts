import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationBuyListRoutingModule } from './operation-buy-list-routing.module';
import { OperationBuyListComponent } from './operation-buy-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NullablePipe } from 'src/common/pipes/NullablePipe';
import { PercentagePipe } from 'src/common/pipes/PercentagePipe';


@NgModule({
  declarations: [
    OperationBuyListComponent,
    NullablePipe,
    PercentagePipe
  ],
  imports: [
    CommonModule,
    OperationBuyListRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ]
})
export class OperationBuyListModule { }
