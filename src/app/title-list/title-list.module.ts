import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TitleListRoutingModule } from './title-list-routing.module';
import { TitleListComponent } from './title-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { TitleFormModule } from '../title-form/title-form.module';


@NgModule({
  declarations: [
    TitleListComponent
  ],
  imports: [
    CommonModule,
    TitleListRoutingModule,
    TitleFormModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class TitleListModule { }
