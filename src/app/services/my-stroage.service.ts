import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { EncrDecrService } from './encr-decr.service';

@Injectable({
  providedIn: 'root'
})
export class MyStroageService {

  constructor(private encript:EncrDecrService) { }

  setItem(key:string,value:string){
     
    localStorage.setItem(key,this.encript.encr(value));
  }

  getItem(key:string){
    const value=localStorage.getItem(key);
     
    console.log(this.encript.encr(value));
    return this.encript.encr(value);
  }
  delete(key){
    localStorage.removeItem(key);
  }
  deleteAll(){
    localStorage.clear();
  }
}
