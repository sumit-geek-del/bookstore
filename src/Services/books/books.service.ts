import { ServerUrlConstant } from './../../Constants/ServerURLConstant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddBookDTO } from 'src/models/addBookDTO';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  URL:string = ServerUrlConstant.URL;

  constructor(private _http:HttpClient) { }

  getAllBooks():Observable<any>{
    return this._http.get<any>(`${this.URL}books/getBooks`)
  }

  addNewBook(addBookDTO:IAddBookDTO):Observable<any>{
    return this._http.post<any>(`${this.URL}books`, addBookDTO)
  }

  deleteBook(bookId:string):Observable<any>{
    return this._http.delete<any>(`${this.URL}books/deleteBooks?bookId=${bookId}`);
  }

  updateBookDetails(updateBooksDTO:IAddBookDTO):Observable<any>{
    return this._http.patch<any>(`${this.URL}books/updateBooks`, updateBooksDTO);
  }
}
