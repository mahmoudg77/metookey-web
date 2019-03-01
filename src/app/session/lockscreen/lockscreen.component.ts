import { Title } from '@angular/platform-browser';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {Router} from "@angular/router";

@Component({
   selector: 'ms-lockscreen',
   templateUrl:'./lockscreen-component.html',
   styleUrls: ['./lockscreen-component.scss'],
   encapsulation: ViewEncapsulation.None,
})
export class LockScreenComponent {
	
  username: string;

  constructor(
    private router: Router,private title:Title
  ) { }
  onSubmit() {
    this.router.navigate ( ['/'] );
  }
	ngOnInit(){
    this.title.setTitle("Lockscreen");
  }
}



