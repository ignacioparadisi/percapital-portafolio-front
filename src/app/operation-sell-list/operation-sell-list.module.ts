import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationSellListRoutingModule } from './operation-sell-list-routing.module';
import { OperationSellListComponent } from './operation-sell-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PipesModule } from 'src/common/pipes/pipes.module';


@NgModule({
  declarations: [
    OperationSellListComponent
  ],
  imports: [
    CommonModule,
    OperationSellListRoutingModule,
    PipesModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ]
})
export class OperationSellListModule { }
