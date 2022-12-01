import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path:'', loadChildren: ()=> import('src/app/layout/layout.module').then((module)=> {return module.LayoutModule}).catch((err)=>{throw new Error("Error in layout module routing")})
},
{
  path:'signUp', loadChildren:()=> import('src/app/layout/signup/signup.module').then((module)=>{return module.SignupModule}).catch((err)=>{throw new Error("Error in signup routing module")})
},
{
  path:'books', loadChildren:()=> import('src/app/layout/books/books.module').then((module)=> {return module.BooksModule}).catch((err)=>{
    throw new Error("Error in books Routing")
  })
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
