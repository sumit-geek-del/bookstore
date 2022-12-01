import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INavbar } from 'src/app/app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _route:Router) { }
  @Input() navbarMenu!:INavbar[];

  ngOnInit(): void {
  }

  routeToComponent(routePath:string):void{
    this._route.navigate([`${routePath}`], {skipLocationChange:true});
  }

}
