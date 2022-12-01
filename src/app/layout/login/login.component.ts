import { ILogin } from './../../../models/loginDTO';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/Services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  

  constructor(private _fb:FormBuilder, private _loginService:LoginService, private _router:Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm():void{
    this.loginForm = this._fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(8)]]
    })
  }

  login():void{

    if(this.loginForm.invalid){
      const controls:string[] = Object.keys(this.loginForm.controls);
      controls.forEach((item)=>{
        if(this.loginForm.controls[item].status == 'INVALID'){
          (this.loginForm.controls[item] as FormControl).markAsTouched();
        }
      })
    }
    if(this.loginForm.valid){
        const loginDTO:ILogin = {
          email:this.getUserEmail,
          password:this.userPassword
        }

        this._loginService.login(loginDTO).subscribe((res)=>{
          if(res.code=="LOG-200"){
            this._router.navigate(['books'], {skipLocationChange:true})
          }
          else{
            this._router.navigate([''], {skipLocationChange:true})
          }
        })
        
        
    }

  }



  // getters and setters
  get getUserEmail():string{
    return this.loginForm.controls['email'].value;
  }
  get userPassword():string{
    return this.loginForm.controls['password'].value;
  }
}
