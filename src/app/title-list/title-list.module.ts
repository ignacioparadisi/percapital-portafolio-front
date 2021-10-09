import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TitleListRoutingModule } from './title-list-routing.module';
import { TitleListComponent } from './title-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    TitleListComponent
  ],
  imports: [
    CommonModule,
    TitleListRoutingModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [
    MatTableModule,
    MatPaginatorModule
  ]
})
export class TitleListModule { }
