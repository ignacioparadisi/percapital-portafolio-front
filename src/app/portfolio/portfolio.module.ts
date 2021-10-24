import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './portfolio.component';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { PipesModule } from 'src/common/pipes/pipes.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    PortfolioComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    PipesModule,
    MatProgressSpinnerModule
  ]
})
export class PortfolioModule { }
