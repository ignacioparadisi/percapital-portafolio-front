import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertDialogRoutingModule } from './alert-dialog-routing.module';
import { AlertDialogComponent } from './alert-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AlertDialogComponent
  ],
  imports: [
    CommonModule,
    AlertDialogRoutingModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class AlertDialogModule { }
