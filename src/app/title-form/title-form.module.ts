import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TitleFormRoutingModule } from './title-form-routing.module';
import { TitleFormComponent } from './title-form.component';


@NgModule({
  declarations: [
    TitleFormComponent
  ],
  imports: [
    CommonModule,
    TitleFormRoutingModule
  ]
})
export class TitleFormModule { }
