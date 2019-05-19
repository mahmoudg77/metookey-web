import { MyStroageService } from './my-stroage.service';
import { environment } from './../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { CallapiService } from './callapi.service';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { NotificationServiceService } from './notification-service.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs-compat/operator/map';
 
@Injectable()
export class AuthService {
 public isLoggedIn:boolean=false;
 
  constructor( private call:CallapiService,
    private shared:SharedService,
    private notifyService:NotificationServiceService,
    private storage:MyStroageService
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
          this.storage.setItem("roles",(<string[]>next.roles).join(","));
          //this.shared.setToken(next.token);
          this.notifyService.start();
          if(next_fn!=null) next_fn(next);
        },
        error=>{
          this.shared.setToken(null);
          this.shared.setUser(null);
          this.shared.roles=null;
          this.storage.delete("roles");

          if(error_fn!=null) error_fn(error);
          this.notifyService.stop();
        }
      )
      }
    }

    // hasRole(role:string):Observable<boolean>{
    //   let headers:HttpHeaders= new HttpHeaders({"APP_KEY":environment.apiKey});
    
    //   if(this.shared.getToken()!=null && this.shared.getToken()!=undefined) headers= new HttpHeaders({"APP_KEY":environment.apiKey,"AUTH_KEY":this.shared.getToken()});
  
    //   return this.call.http.post<any>("/user/hasrole?role"+role,"",{headers:headers}).pipe();
       
    // }

}
