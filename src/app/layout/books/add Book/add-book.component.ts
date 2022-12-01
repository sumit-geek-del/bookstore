import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IAddBookDTO } from 'src/models/addBookDTO';
import { BooksService } from 'src/Services/books/books.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  addBooksForm!:FormGroup

  constructor(private _fb:FormBuilder, private _booksService:BooksService, private _dialog:MatDialogRef<AddBookComponent>) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm():void{
    this.addBooksForm = this._fb.group({
      name:['', [Validators.required]],
      author:['', [Validators.required]],
      language:['', [Validators.required]],
      category:['', [Validators.required]]
    })
  }

  addBook(){
    if(this.addBooksForm.invalid){
      const controls = Object.keys(this.addBooksForm.controls);
      controls.forEach((item)=>{
        if((this.addBooksForm.controls[item] as FormControl).status == 'INVALID'){
          (this.addBooksForm.controls[item] as FormControl).markAsTouched();
        }
      })
    }


    if(this.addBooksForm.valid){
      const addBooksDTO:IAddBookDTO ={
        bookName:this.getBookName,
        bookAuthor:this.getBookAuthorName,
        bookLanguage:this.getBookLanguage,
        bookCategory:this.getBookCategory
      }

      this._booksService.addNewBook(addBooksDTO).subscribe((res)=>{
        console.log(res);
       
      })
      this._dialog.close();


    }
    
  }

  closeModal(){
    this._dialog.close();
  }

  //getters and setters 

  get getBookName():string{
    return this.addBooksForm.controls['name'].value;
  }

  get getBookAuthorName():string{
    return this.addBooksForm.controls['author'].value;
  }

  get getBookLanguage():string{
    return this.addBooksForm.controls['language'].value;
    
  }

  get getBookCategory():string{
    return this.addBooksForm.controls['category'].value;
  }

}
