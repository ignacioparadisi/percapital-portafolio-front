import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationSellListRoutingModule } from './operation-sell-list-routing.module';
import { OperationSellListComponent } from './operation-sell-list.component';


@NgModule({
  declarations: [
    OperationSellListComponent
  ],
  imports: [
    CommonModule,
    OperationSellListRoutingModule
  ]
})
export class OperationSellListModule { }
