import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NullablePipe } from './nullable.pipe';
import { PercentagePipe } from './percentage.pipe';



@NgModule({
  declarations: [
    NullablePipe,
    PercentagePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NullablePipe,
    PercentagePipe
  ]
})
export class PipesModule { }
