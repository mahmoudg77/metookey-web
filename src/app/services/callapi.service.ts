import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { SharedService } from './shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { TranslateService} from '@ngx-translate/core';
import { stringify } from 'querystring';
import { environment } from '../../environments/environment';
import { GlobalData } from './global-data';
@Injectable()
export class CallapiService {

  constructor(public http:HttpClient,private translate:TranslateService,private shared:SharedService,private route:Router) { 
    this.loadLocale()
  }

  login(uid:string,pass:string,success_callbak:any,error_callback:any=null){
    let lang=this.translate.currentLang;
    let headers = new HttpHeaders({"APP_KEY":environment.apiKey});

    let result=   this.http.post(environment.apiUrl + "/" + lang  + '/User/Login',{'username' : uid , 'password': pass},{headers})
    .map(result=>new apiResult(result));
    let _this=this;
    result.subscribe(
         next=>{
          if (next.type == "1") {
            success_callbak(next.data);              
          } else {
            error_callback(next.message);
          }
         },
         error=>{
          if(error_callback!=undefined)  error_callback(error);
          this.errorHandling(error);
         }
       )
    //return null;
  }
  loadLocale(){
    let lang=this.translate.currentLang;
    
    let headers = new HttpHeaders({"APP_KEY":environment.apiKey});
    return this.http.get(environment.apiUrl + "/" + lang + "/Language/js",{headers}).subscribe(
      next=>{
        this.shared.setLocale(next);
      },
    );
   }
  getRequest(url:string,pars:any,success_callbak:any,error_callback:any=null){
     let parms=stringify(pars);
    let headers:HttpHeaders= new HttpHeaders({"APP_KEY":environment.apiKey});
    
    if(this.shared.getToken()!=null && this.shared.getToken()!=undefined) headers= new HttpHeaders({"APP_KEY":environment.apiKey,"AUTH_KEY":this.shared.getToken()});
    //console.log(url,headers);
    
    let lang=this.translate.currentLang;
    var result=this.http.get(environment.apiUrl + "/" + lang  + url +(parms?"?":"")+parms,{headers})
                      .map(result=>new apiResult(result));
    var _this=this;
    result.subscribe(
      next=>{
       if (next.type == "1") {
          success_callbak(next.data);              
       } else {
        if(error_callback!=undefined)  error_callback(next.message);
       }
      },
      error=>{
        if(error_callback!=undefined)  error_callback(error.statusText);
        this.errorHandling(error);
      }
    )
  }

    postRequest(url:string,pars:any,success_callbak:any,error_callback:any=null){
    //var token= this.shared.getToken()||'';

    let headers:HttpHeaders= new HttpHeaders({"APP_KEY":environment.apiKey});
    
    if(this.shared.getToken()!=null && this.shared.getToken()!=undefined) headers= new HttpHeaders({"APP_KEY":environment.apiKey,"AUTH_KEY":this.shared.getToken()});
    //console.log(url,headers);
    
    let lang=this.translate.currentLang;

      this.http.post(environment.apiUrl + "/" + lang  + url ,pars,{headers}).map(result=>new apiResult(result))
              .subscribe(
                next=>{
                    if (next.type == "1") {
                        
                        success_callbak(next.data);              
                    } else {
                      if(error_callback!=undefined) error_callback(next.message);
                    }
                },
                error=>{
                   if(error_callback!=undefined)  error_callback(error.statusText);
                  this.errorHandling(error);
                    
                }
              ) 
    }

    errorHandling(error:any){
      if(error.status==403){
        if(this.shared.isLogin()) this.shared.clearToken();
        this.route.navigate([{outlets:{modal:['login']}}]);
      }else if(error.status==401){
        this.shared.error("You are not allowed to perform this action");
      }else if(error.status==500){
        //this.shared.error("There are problem in the server !!");
      }else if(error.status==502){
        //this.shared.error("Bad Gateway error !!");
      }else if(error.status==406){
        this.shared.error("This option is disbaled now !!");
      }else{
        //this.shared.error(error.message);
      }
    }

    loadSettings(){
      this.postRequest("/Setting/General","",
        next=>{
          GlobalData.settings=next;
          this.loadCategories();
        });
    }
    loadCategories(){
      this.postRequest("/Category/All",{"length":100},next=>{GlobalData.categories=next.data});
    }
    
    checkLogin(){
    
      if(this.shared.getToken()!=null){
        //console.error(this.shared.getToken());
        this.postRequest("/User/Current","",
        next=>{
          this.shared.setUser(next.account);
          this.shared.roles=next.roles;
        },
        error=>{
          this.shared.setToken(null);
          this.shared.roles=[];
        }
      )
      }
    }
}
 export class imageData{
  file:File;
  model:string;
  id:number;
  tag?:string="main";
  constructor(_file:File,_model:string,_id:number,private call:CallapiService,_tag:string="main"){
    this.file=_file;
    this.model=_model;
    this.id=_id;
    this.tag=_tag;
  }
 
  upload(success_callbak:any,error_callback:any=null){
    const uploadData = new FormData();
   //console.log(this.file);
    uploadData.append('img', this.file, this.file.name);

    this.call.postRequest("/Image/Upload?model="+this.model+"&model_id="+this.id+"&model_tag="+this.tag,uploadData,
      res=>{
        if(success_callbak){
          success_callbak(res);
        }
      },
      error=>{
        if(error_callback){
          error_callback(error);
        }
      }
    )
  }
  
}
export class apiResult{
    type:string;
    message:string;
    data:any;
    constructor(obj:any){
      this.type=obj.type;
      this.message=obj.message;
      this.data=obj.data;
    }
}


// export class CONSTS{
//   //public static apiUrl:string='https://web-egy.com/api';
//   //public static apiUrl:string='http://localhost:38360/api';
//   //public static apiUrl:string='https://localhost:44321/api';

// //   public static apiKey:string='Wnmbyz22xi7prd7uTL6h7ZVzG28NHaWoU7FWXeQ4cWUFnxRzxuQFvH6yJc3Hb8wZkNbjj3a5kSCQPGew';
//  }
