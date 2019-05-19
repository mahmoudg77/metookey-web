import { LoginoneComponent } from './../session/loginone/loginone.component';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import {  ToastrService, ToastContainerDirective, ToastrConfig } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Guid } from "guid-typescript";
import { TranslateService } from '@ngx-translate/core';
import { MyToasterService } from './my-toaster.service';
import { MyStroageService } from './my-stroage.service';
import { EncrDecrService } from './encr-decr.service';
//import {SimpleCrypto} from "simple-crypto-js";
declare var $:any;

const TOKEN_COOCKIE_NAME:string="MetookeyToken";
const TOKEN_STORAGE_NAME:string="MetookeyToken";
@Injectable()
export class SharedService {
  getCssStyle(): string {
    if(localStorage.getItem('lang') == "ar"){
      //return 'https://cdn.rtlcss.com/bootstrap/v4.0.0/css/bootstrap.min.css' ; 
      return 'assets/css/style-rtl.css';
    }else{
      return 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' ; 
    } 
  }
  public transite:any;
    error(message:string){
      this.toaster.error(message,"Error");
      
    }
    success(message:string){
      this.toaster.success(message,"Success");
    }

    notify(message:string,title:string,action_callback){
     const options:Partial<ToastrConfig>={
        closeButton: true,
        progressBar: true,
        positionClass: "toast-bottom-right",
        enableHtml: true
      }
      

      this.toastrService.info(message,title, options).onTap.subscribe(next=>{
        action_callback();
      });
    }
  user: any=null;
  public locale: any;
  public modalOpened=false;
  roles:string[]=[];
  asFrame:boolean
  constructor(private cookie:CookieService,
              private toastrService:ToastrService,
              private route:Router,
              private location:Location,
              private translator:TranslateService,
              private toaster:MyToasterService,
             private encript:EncrDecrService

    ) {
    // if(this.locale==undefined){
    //   this.locale={};
    // }
    //this.loadLocale();
  }
  getLocale() {
    return this.locale;
  }
  setLocale(value: any) {
    this.locale = value;
  }
  isLeadSent():boolean{
    if(localStorage.getItem("leadSent")=="1") return true;

    return false;
  }
  setLeadSent(val:string) {
    localStorage.setItem("leadSent",val);
  }
  getToken() {
     let token=this.cookie.get(TOKEN_COOCKIE_NAME) || localStorage.getItem(TOKEN_STORAGE_NAME) || null;
     if(token==null) return null;
     return Guid.isGuid(token)?token:null;
  }
  setToken(value: string,rem:boolean=false) {
    this.cookie.set(TOKEN_COOCKIE_NAME,value,5,"/");
    if(rem)localStorage.setItem(TOKEN_STORAGE_NAME,value);
  }
  clearToken(){
    this.cookie.delete(TOKEN_COOCKIE_NAME);
    this.cookie.deleteAll();
    localStorage.removeItem(TOKEN_STORAGE_NAME);
  }
  isLogin() {
    if (this.getToken()!=null && this.getToken()!=undefined) {
       return true;
    } else {
      return false;
    }
  }
  getUser() {
    return this.user;
  }
  setUser(value: any) {
    this.user = value;
  }

  
  userHasRole(role:string):boolean{
    const strRoles=localStorage.getItem("roles");

    var roles=this.encript.decr(strRoles).split(",");
    if(roles==null) return false;
    return roles.filter(a=>a==role).length>0;
  }

  getTime() {
    var d = new Date();
    let h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
      m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes(),
      s = (d.getSeconds() < 10 ? '0' : '') + d.getSeconds(),
      time = h + ':' + m + ':' + s;
    return time;
  }
  serverMessage(msg: string) {
    let locale = this.locale;
    try {
      var m = eval('locale.' + msg);
      if (m == undefined) {
        m = msg;
      }
      return m;
    } catch (error) {
      return msg;
    }



  }

  dateDiff(interval:string,date2:any,date1:any):number{
    let diffInMs: number = Date.parse(date2) - Date.parse(date1);

    switch(interval){
      case "s":
      return diffInMs / 1000;
      case "m":
      return diffInMs / 1000 / 60 ;
      case "h":
      return diffInMs / 1000 / 60 / 60;
      case "d":
      return diffInMs / 1000 / 60 / 60 / 24;
      case "w":
      return diffInMs / 1000 / 60 / 60 / 24 / 7;
      case "M":
      return diffInMs / 1000 / 60 / 60 / 24 / 30;
      case "y":
      return diffInMs / 1000 / 60 / 60 / 24 / 365;
    }
   }
   getDate():Date{
     const d=new Date();
     return new Date(d);
   }

   closeModal(redirectUrl:string="") {
     const url=this.route.url.replace(/\(.+|\s+\)/g,'');
     $("html").css({'overflow':'auto'});
     
    this.route.navigate([{outlets: {modal: null}}]);
    this.route.navigateByUrl('/dashboard', {skipLocationChange: true})
    .then(() =>this.route.navigateByUrl((redirectUrl=="")?url:redirectUrl));
}

 validateEmail(email):boolean {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

appUrl(){
  return window.location.protocol+"//"+ window.location.hostname+(window.location.port!=''?':'+window.location.port:'');
}

translate(key:string){
  let foo = this.translator.get(key);
  return foo;
}

isImageFile(file){      
  let acceptedImageTypes = {'image/png': true,'image/jpeg': true,'image/gif': true};
    if (acceptedImageTypes[file.type] !== true){
        return false;	
    }
    else if (file.size>1024*1024){
        return false;	
    } 
      return true;   
    }//checkfiles

    hideAddThis(){
      $("#at-expanding-share-button").hide();
    }
    showAddThis(){
      $("#at-expanding-share-button").show();
    }

    
}
async function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}