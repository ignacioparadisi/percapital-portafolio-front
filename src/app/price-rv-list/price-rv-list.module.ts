import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriceRvListRoutingModule } from './price-rv-list-routing.module';
import { PriceRvListComponent } from './price-rv-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { PipesModule } from 'src/common/pipes/pipes.module';


@NgModule({
  declarations: [
    PriceRvListComponent
  ],
  imports: [
    CommonModule,
    PriceRvListRoutingModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    PipesModule
  ]
})
export class PriceRvListModule { }
