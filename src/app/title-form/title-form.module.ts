import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TitleFormRoutingModule } from './title-form-routing.module';
import { TitleFormComponent } from './title-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    TitleFormComponent
  ],
  imports: [
    CommonModule,
    TitleFormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ]
})
export class TitleFormModule { }
