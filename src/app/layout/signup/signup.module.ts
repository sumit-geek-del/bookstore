import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SignupComponent } from './signup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';


@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SignupModule { }
