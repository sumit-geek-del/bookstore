import { BooksService } from './../../../../Services/books/books.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAddBookDTO } from 'src/models/addBookDTO';
import { IFormBookDTO } from 'src/models/formGroupBookDTO';

@Component({
  selector: 'app-update-books',
  templateUrl: './update-books.component.html',
  styleUrls: ['./update-books.component.css']
})
export class UpdateBooksComponent implements OnInit {
  updateBooksForm!:FormGroup;
  constructor(private _fb:FormBuilder, @Inject(MAT_DIALOG_DATA) public data: IAddBookDTO,private _booksService:BooksService, private dialog:MatDialogRef<UpdateBooksComponent>) { }

  ngOnInit(): void {
    this.createForm();
    this.updateBooksForm.setValue({
      name:this.data.bookName,
      author:this.data.bookAuthor,
      language:this.data.bookLanguage,
      category:this.data.bookCategory
    })
  }

  createForm(){
    this.updateBooksForm = this._fb.group({
      name:['', [Validators.required]],
      author:['', [Validators.required]],
      language:['', [Validators.required]],
      category:['', [Validators.required]]
    })
  }

  updateBookDetails(){
    if(this.updateBooksForm.invalid){
      const controls = Object.keys(this.updateBooksForm.controls);

      controls.forEach((item)=>{
        if(this.updateBooksForm.controls[item].status == 'INVALID'){
          (this.updateBooksForm.controls[item] as FormControl).markAsTouched();
        }
      })
    }
    if(this.updateBooksForm.valid){

      const updateBooksDTO:IAddBookDTO = {
        bookName:this.getBookName,
        bookAuthor:this.getBookAuthorName,
        bookLanguage:this.getBookLanguage,
        bookCategory:this.getBookCategory,
        bookId:this.data.bookId?.toString()
      }
      this._booksService.updateBookDetails(updateBooksDTO).subscribe((res)=>{
        if(res.code=="UP-201"){
          this.closeModal();
        }
      })

    
    }
  }

  closeModal(){
    this.dialog.close();
  }



 //getters
 get getBookName():string{
  return this.updateBooksForm.controls['name'].value;
}

get getBookAuthorName():string{
  return this.updateBooksForm.controls['author'].value;
}

get getBookLanguage():string{
  return this.updateBooksForm.controls['language'].value;
  
}

get getBookCategory():string{
  return this.updateBooksForm.controls['category'].value;
}

}
