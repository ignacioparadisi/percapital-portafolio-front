import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConstantValueFormRoutingModule } from './constant-value-form-routing.module';
import { ConstantValueFormComponent } from './constant-value-form.component';


@NgModule({
  declarations: [
    ConstantValueFormComponent
  ],
  imports: [
    CommonModule,
    ConstantValueFormRoutingModule
  ]
})
export class ConstantValueFormModule { }
