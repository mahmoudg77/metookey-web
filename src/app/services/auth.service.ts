import { FirebaseMessagesService } from './firebase-messages.service';
import { Observable } from 'rxjs';
import { CallapiService } from './callapi.service';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { NotificationServiceService } from './notification-service.service';

@Injectable()
export class AuthService {
 public isLoggedIn:boolean=false;
 
  constructor( private call:CallapiService,
    private shared:SharedService,
    private notifyService:NotificationServiceService,

      ) {
 
  }

    getIfLoggedIn():any{
      return this.shared.isLogin();
    
    }

      checkLogin(next_fn=null,error_fn=null){
    
      if(this.shared.getToken()!=null){
        //console.error(this.shared.getToken());
        this.call.postRequest("/User/Current","",
        next=>{
          this.shared.setUser(next.account);
          this.shared.roles=next.roles;
          //this.shared.setToken(next.token);
          //this.notifyService.start();
         if(next_fn!=null) next_fn(next);
        },
        error=>{
          this.shared.setToken(null);
          if(error_fn!=null) error_fn(error);
          //this.notifyService.stop();
        }
      )
      }
    }

}
