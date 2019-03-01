import { Title } from '@angular/platform-browser';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
import { CallapiService } from '../../services/callapi.service';
import { SharedService } from '../../services/shared.service';
import {Location} from '@angular/common';

@Component({
   selector: 'ms-forgot-password',
   templateUrl:'./forgot-password-component.html',
   styleUrls: ['./forgot-password-component.scss'],
   encapsulation: ViewEncapsulation.None,
})
export class ForgotPasswordComponent implements OnInit {
	
	email: any;
  password: string;
  cpassword:string;
  key: string;
  sent:boolean=false;
  msgResetPassword: string="";
  constructor(
    private router: Router,private title:Title,private shared: SharedService, private call: CallapiService,private _location: Location,
    private currentRoute:ActivatedRoute
  ) { }

  send() {
    this.router.navigate(['/']);
  }
  ngOnInit(){
    this.title.setTitle("Reset Password");
    this.currentRoute.params.subscribe(params=>{
      this.key = params['key'];
  });
  }

  backClicked() {
    this._location.back();
  }

  forgetPassword(){
    if (this.email){
      // console.log(this.email);
      //this.router.navigate(['/session/newpassword']);
//+"&ResetURL=http://localhost:4200/session/newpassword"
      this.call.postRequest("/User/RequestResetPassword_byMail?Email="+ this.email , "",
        next=>{
              this.sent=true;
               // this.router.navigate(['/login']);
        },
        error=>{
          this.msgResetPassword=error;
        },
        
      )
    }
    
  }

        resetPassword(){
        if(this.password == this.cpassword){
          this.call.postRequest("/User/ResetPassword?ResetPwdKey="+this.key+"&NewPassword="+this.password, "",
              next=>{
                      this.router.navigate([{outlets:{modal:['login']}}]);
              },
              error=>{
                this.msgResetPassword=error;
              },
              )
              //this.router.navigate(['/login']);
        }else{
          this.msgResetPassword="The passwords not matches !";
        }
      }

}



