import { Title } from '@angular/platform-browser';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {Router} from "@angular/router";

@Component({
   selector: 'ms-not-found',
   templateUrl:'./not-found-component.html',
   styleUrls: ['./not-found-component.scss'],
   encapsulation: ViewEncapsulation.None,
})

export class NotFoundComponent {
	
  username: string;

  constructor(
    private router: Router,private title:Title
  ) { }
  onSubmit() {
    this.router.navigate ( ['/'] );
  }
	ngOnInit(){
    this.title.setTitle("404 Not Found");
  }
}



