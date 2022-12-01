import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISignUpDTO } from 'src/models/signUpDTO';
import { LoginService } from 'src/Services/login/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm!:FormGroup;

  constructor(private _fb:FormBuilder, private _loginService:LoginService,private _router:Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm():void{
    this.signUpForm = this._fb.group({
      name:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(8)]]
    })
  }

  signUp(){
    if(this.signUpForm.invalid){
      const controls:string[] = Object.keys(this.signUpForm.controls);
      controls.forEach((item)=>{
        if(this.signUpForm.controls[item].status == 'INVALID'){
          (this.signUpForm.controls[item] as FormControl).markAsTouched();
        }
      })

    }

    if(this.signUpForm.valid){
      const signUpDTO:ISignUpDTO = {
        name:this.getUserName,
        email:this.getUserEmail,
        password:this.getUserPassword
      }

      this._loginService.signUp(signUpDTO).subscribe((res)=>{
        if(res.code=="CRE-201"){
          this._router.navigate([''], {skipLocationChange:true});
        }
        else{
          this._router.navigate(['signUp'], {skipLocationChange:true});
        }
      })


    }
  }

  //getters and setters 

  get getUserName():string{
    return this.signUpForm.controls['name'].value;
  }

  get getUserEmail():string{
    return this.signUpForm.controls['email'].value;
  }

  get getUserPassword():string{
    return this.signUpForm.controls['password'].value;
  }

}
