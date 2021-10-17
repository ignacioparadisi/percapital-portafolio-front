import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationBuyListRoutingModule } from './operation-buy-list-routing.module';
import { OperationBuyListComponent } from './operation-buy-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PipesModule } from 'src/common/pipes/pipes.module';


@NgModule({
  declarations: [
    OperationBuyListComponent
  ],
  imports: [
    CommonModule,
    OperationBuyListRoutingModule,
    PipesModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ]
})
export class OperationBuyListModule { }
