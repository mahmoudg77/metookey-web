import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  appKey="4cdc495852594edc823763ee0a07061f";
  constructor(private http:HttpClient) { 

  }

  getCurrancyPrice(to:string,base:string='USD'):Observable<CurrancyCharge>{
  return  this.http.get("https://openexchangerates.org/api/latest.json?app_id="+this.appKey+"&symbols="+to+"&base="+base).map((result)=>{return new CurrancyCharge(result)});
  }
}
export class CurrancyCharge
{
  //success: boolean;
  rates:CurrancyRates;
  constructor(obj:any){
    //this.success=obj.success;
    this.rates=obj.rates;
  }
}

export class CurrancyRates{
  EGP: number;
  USD: number;
}
 