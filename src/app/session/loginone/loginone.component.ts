import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CallapiService } from '../../services/callapi.service';
import { SharedService } from '../../services/shared.service';
import { Component, OnInit, ViewEncapsulation, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { Title } from '@angular/platform-browser';

import { NotificationServiceService } from 'app/services/notification-service.service';
import { SocialAuthService } from 'app/services/social-auth.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralModalService } from 'app/services/general-modal.service';
declare var $:any;
@Component({
  selector: 'ms-loginone-session',
  // exportAs:'modal',
  templateUrl: './loginone-component.html',
  styleUrls: ['./loginone-component.scss'],
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
export class LoginoneComponent {

  username: string;
  password: string;
  errorMessage: string = "";
  isWaiting: boolean = false;
  submitted :boolean=false;
  remember:boolean;
  form: FormGroup;
  
  constructor(private router: Router, private title: Title,
    private shared: SharedService, 
    private call: CallapiService,
    private notify:NotificationServiceService,
    private social:SocialAuthService,
    // public activeModal:NgbActiveModal,
    // private modal:GeneralModalService,
    // private ngzone:NgZone
    ) {
      this.form=new FormGroup(
        {
          username: new FormControl('',[Validators.required,Validators.email]),
          password: new FormControl('',[Validators.required]),
        }
      );
  }
  ngOnInit() {
    this.title.setTitle("Login");
  }
  modalClose(event:any){
    if(event!=null)
    if('redirect' in event)
    this.router.navigate([{outlets: {modal: null}}]).then(next=>{this.router.navigate([event.redirect])});

  }
  
  loginone() {
    this.submitted = true;
    if (this.form.invalid) {
      console.error("Form invalid !!")
      return;
    }
    //if(this.username=="admin" && this.password=="admin"){
    //this.loginButton = "btn-submit";
    this.isWaiting = true;
    // localStorage.setItem('token',null);
    // this.cookie.set('token',null);
    this.call.login(this.username, this.password
      ,next=>{
        this.shared.setUser(next.account);
        this.shared.setToken(next.token,this.remember);
        this.shared.roles=next.roles;
        // this.cookie.set('token',next.token);
        // if(this.remember) localStorage.setItem("token", next.token);
        this.isWaiting = false;
        //this.router.navigate([{outlets: {modal: null}}]);
        this.notify.start();
        // this.activeModal.close();
        this.shared.closeModal();
        },
        err=>{
          this.isWaiting =false;
          //this.shared.error("Usernamr Or Password Not Found !");
         
          this.shared.translate("Usernamr Or Password Not Found !").subscribe(v=>{
            this.errorMessage=v;
          });
        }
        );
      //   },
      //   error => {
      //     console.log(error);
      //     this.loginButton = "btn-loading";
      //     this.isLoginButton = false;
      //   },
      //   () => {
      //     console.log("Done");
      //   }
      // )
    // if( ['admin','user','sales'].includes(this.username)){

    //     this.shared.setUser({name:this.username});
    //     this.shared.setToken("asdasdqweqweasd");
    //     this.router.navigate(['/dashboard']);
    //   }else
    //     this.errorMessage="Invalid Username or Password !";
  }


  resetMessage() {
    this.errorMessage = "";
  }

  public socialSignIn(socialPlatform : string) {
    this.social.loginWithNetwork(socialPlatform).then(response=>{
      response.user.getIdToken(true).then((idToken) =>{
        this.call.postRequest("/User/FirebaseOAuth?network=" + socialPlatform + "&AccessToken=" + idToken,{},
          (next)=>{
            this.shared.setUser(next.account);
            this.shared.setToken(next.token);
            this.shared.roles=next.roles;
            //this.activeModal.close();
            this.shared.closeModal();
          }
        );
      },err=>{
          console.error(err);
      });
     });
  }
}



