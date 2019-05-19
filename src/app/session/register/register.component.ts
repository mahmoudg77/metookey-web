import { LoginoneComponent } from './../loginone/loginone.component';
import { WindowService } from './../../services/window.service';
import { GlobalData } from 'app/services/global-data';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewEncapsulation, NgZone, ViewChild } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";


import { SharedService } from '../../services/shared.service';
import { CallapiService } from '../../services/callapi.service';
import {Location} from '@angular/common';

import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { SocialAuthService } from 'app/services/social-auth.service';
import { NotificationServiceService } from 'app/services/notification-service.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { RecaptchaComponent } from 'ng-recaptcha';
import { EncrDecrService } from 'app/services/encr-decr.service';

declare var $:any;
declare var grecaptcha:any;

@Component({
   selector: 'ms-register-session',
   templateUrl:'./register-component.html',
   styleUrls: ['./register-component.scss'],
   encapsulation: ViewEncapsulation.None,
   animations: [
    trigger('changeState', [
      state('', style({
        display: 'none',
        transition: 'display 0s linear',
       })),
      state('true', style({
        display: 'block',
      })),
      transition('* => *', animate('300ms')),
    ])
  ]
})
export class RegisterComponent  implements OnInit{
 
  model:any={};
  key: string;
  confirmed:any=null;
  form:FormGroup;
  global=GlobalData;
  recaptcha_error: string="";
  windowRef: any;
  errorMessage: string="";
  // twitterClient: any;
  isWaiting: boolean = false;
  submitted :boolean=false;
  //@ViewChild(ReCaptcha2Component) recaptchaDiv:ReCaptcha2Component;

  @ViewChild(RecaptchaComponent) my_recaptcha:RecaptchaComponent

  constructor(
      private title: Title, 
      private call:CallapiService, 
      public shared: SharedService, 
      private _location: Location, 
      private router: Router,
      private currentRoute:ActivatedRoute,
      //private cookie:CookieService,
      private ngzone :NgZone,
      private translate:TranslateService,
      private social:SocialAuthService,
      private win:WindowService,
      private notify:NotificationServiceService,
      private encript:EncrDecrService
  ) { 

    this.form=new FormGroup(
                            {
                              first_name: new FormControl(null,[Validators.required,Validators.minLength(2)]),
                              last_name: new FormControl(null,[Validators.required,Validators.minLength(2)]),
                              password: new FormControl(null,[Validators.required,Validators.minLength(8)]),
                              cpassword: new FormControl(null,[Validators.required]),
                              email: new FormControl(null,[Validators.required, Validators.email]),
                              agree: new FormControl(null,[Validators.required]),
                              recaptcha: new FormControl(null, Validators.required),
                            }
                          );
  }
  
  register() {
    this.submitted = true;

    if (this.form.invalid) {
      this.loadRecaptcha();
      return;
    }
    this.recaptcha_error='';
    //Recaptcha validation
    //this.model.recaptcha= $("[name='g-recaptcha-response']").val();
    //this.recaptchaDiv.siteKey=this.global.settings.recaptcha_site_key;
    // if(this.form.controls['recaptcha'].value==''||this.form.controls['recaptcha']==null || this.form.controls['recaptcha']==undefined){
    //   this.recaptcha_error="You must check i'm not robot !";
    //   this.loadRecaptcha();
    //   return;
    // }
    //Validation
    // console.error(this.model.password_strength);
    // return;
    if(this.model.password!=this.model.cpassword){
      // this.form.controls['cpassword'].errors.pattern= "Password strength not enough !";
      return;
    }
    this.isWaiting = true;
    this.model.recaptcha=this.form.controls['recaptcha'].value;
    this.call.postRequest("/Account/Register",this.model,
    next=>{
      this.shared.setUser(next);
      this.shared.setToken(next.token);
      this.shared.roles=next.roles;
      if(!next.roles)
      localStorage.setItem("roles",this.encript.encr(next.roles.join(',')))

      this.isWaiting = false;
      this.notify.start();
      this.shared.closeModal();
    },
    err=>{
      this.shared.translate(err).subscribe(v=>{
        this.errorMessage=v;
      })
      grecaptcha.reset();
      this.isWaiting = false;
    });
    
  }
	ngOnInit(){
    //this.title.setTitle("Regitser");
    this.currentRoute.params.subscribe(params=>{
      this.key = params['key'];
      if(this.key!=undefined)
      {
        this.confirmEmail();
        return;
      }

      this.loadRecaptcha();
      //this.windowRef.recaptchaVerifier.render()
    });
  }

  loadRecaptcha(): void {
    // this.windowRef=this.win.windowRef;
    // //console.log(grecaptcha);
    // this.windowRef.recaptchaVerifier = grecaptcha.render('recaptcha', {
    //   sitekey : this.global.settings.recaptcha_site_key,
    //   theme : 'light',  
    //   callback: (response) =>{
    //      this.form.controls['recaptcha'].setValue(response);
    //    }
    // });
    
    // grecaptcha.reset();
    try{
      this.my_recaptcha.reset();
    }catch(ex){

    }
  }

  
  confirmEmail(){
    this.call.postRequest("/User/ConfirmEmail?key="+this.key,"",
    next=>{
      this.confirmed=next;
      this.shared.success("Congratulation: Your email confirmed successfulty.");
      this.shared.closeModal("/");
    },
    err=>{
      this.confirmed=false;
      this.shared.error(err);
      this.shared.closeModal("/");
    }
  )
  }
  modalClose(event:any){}
  
  
  public socialSignIn(socialPlatform : string) {
    this.social.loginWithNetwork(socialPlatform).then(response=>{
      response.user.getIdToken(true).then((idToken) =>{
        this.call.postRequest("/User/FirebaseOAuth?network=" + socialPlatform + "&AccessToken=" + idToken,{},
          (next)=>{
            this.shared.setUser(next.account);
            this.shared.setToken(next.token);
            this.shared.roles=next.roles;
            if(!next.roles)
            localStorage.setItem("roles",this.encript.encr(next.roles.join(',')))
            this.notify.start();
            this.shared.closeModal();

          }
        );
      });
     });
    /*
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        this.call.postRequest("/User/" + socialPlatform + "?AccessToken=" + userData.token,{token:userData.token},
          (next)=>{
          
              this.shared.setUser(next);
              this.shared.setToken(next.token);

              this.router.navigate(["/"])
          
          }
        );
   
      }
    );*/
  }
  
 
}



