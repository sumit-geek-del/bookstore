import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { from, map, mergeMap, tap } from 'rxjs';
import { IGetBooksDTO } from 'src/models/getBooksDTO';
import { BooksService } from 'src/Services/books/books.service';
import { AddBookComponent } from './add Book/add-book.component';
import { UpdateBooksComponent } from './updateBooks/update-books.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  availableBooks:IGetBooksDTO[] = [];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator)paginator!:MatPaginator;

  displayedColumns:string[] = ['srNo', 'book_name', 'book_author', 'book_language', 'book_category', 'update', 'delete']

  constructor(public dialog:MatDialog, private _booksService:BooksService) { }

  ngOnInit(): void {
    this.fetchBookDetails();
  }
  openAddNewBookModal():void{
    const dialogRef = this.dialog.open(AddBookComponent, {
      height:'70vh',
      width:'60vw'
    })
    dialogRef.afterClosed().subscribe((res)=>{
      this.fetchBookDetails();
    })
  }

  fetchBookDetails(){
    this._booksService.getAllBooks().pipe(map((res)=> {return res.data})).subscribe((res)=>{   
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    })
  }

  updateBookDetails(element:IGetBooksDTO){
    const updateBookDetailsDialogRef = this.dialog.open(UpdateBooksComponent, {
      height:'70vh',
      width:'60vw',
      data:{bookName:element.book_name, bookAuthor:element.book_author, bookLanguage:element.book_language, bookCategory:element.book_category, bookId:element.id}
    })

    updateBookDetailsDialogRef.afterClosed().subscribe(()=>{
      this.fetchBookDetails();
    })
  }

  deleteBook(bookId:number){
    this._booksService.deleteBook(bookId.toString()).subscribe((res)=>{
      if(res.code=="DEL-201"){
        this.fetchBookDetails();
      }
    })
  }

}
