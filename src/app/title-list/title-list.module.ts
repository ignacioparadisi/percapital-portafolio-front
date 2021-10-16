import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TitleListRoutingModule } from './title-list-routing.module';
import { TitleListComponent } from './title-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { TitleFormModule } from '../title-form/title-form.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'


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
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatProgressSpinnerModule
  ]
})
export class TitleListModule { }
