import { Location } from '@angular/common';
import { CallapiService } from './../../services/callapi.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";
import { SharedService } from 'app/services/shared.service';

@Injectable()
export class AdminGuard implements CanActivate,CanActivateChild {
  
  constructor(
    private auth: AuthService,
    private myRoute: Router,
    private call:CallapiService,
    private shared:SharedService
    ){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let status= this.shared.userHasRole('admin');
    //console.log("roles",this.shared.roles);
   if(!status)this.myRoute.navigate(['/']);
   return status;
 }
 
 canActivateChild(
    childRoute: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(childRoute,state);
  }
}

