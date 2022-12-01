import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { AddBookComponent } from './add Book/add-book.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateBooksComponent } from './updateBooks/update-books.component';
import {MatTableModule} from '@angular/material/table'


@NgModule({
  declarations: [
    AddBookComponent,
    UpdateBooksComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatPaginatorModule
  ]
})
export class BooksModule { }
