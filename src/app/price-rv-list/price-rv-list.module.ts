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
import { PriceRvFormModule } from '../price-rv-form/price-rv-form.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


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
    PipesModule,
    PriceRvFormModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class PriceRvListModule { }
