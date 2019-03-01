import { Location } from '@angular/common';
import { CallapiService } from './../../services/callapi.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate,CanActivateChild {
  canActivateChild(
    childRoute: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
   return this.canActivate(childRoute,state);
  }
  constructor(
    private auth: AuthService,
    private myRoute: Router,private call:CallapiService,
    ){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let status= this.auth.getIfLoggedIn();
   if(!status)this.myRoute.navigate([{outlets:{modal:['login']}}]);
   return status;
 }
}

