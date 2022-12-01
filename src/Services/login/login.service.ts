import { ILogin } from './../../models/loginDTO';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerUrlConstant } from 'src/Constants/ServerURLConstant';
import { ISignUpDTO } from 'src/models/signUpDTO';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  URL:string = ServerUrlConstant.URL
  constructor(private _http:HttpClient) { }


  login(loginDTO:ILogin){
    return this._http.post<any>(`${this.URL}login`, loginDTO);
  }
  signUp(signupDTO:ISignUpDTO){
    return this._http.post<any>(`${this.URL}signUp`, signupDTO);
  }
}
