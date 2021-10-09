import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleFormComponent } from './title-form.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { GraphQLModule } from '../graphql.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    TitleFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class TitleFormModule { }
