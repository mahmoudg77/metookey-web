import { CurrencyService } from './currency.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class PaypalService {
  private payment:PayPalPayment;
  private appToken:string;//="QVlmclFERmQ0T2Zwbm5VLUFyQlVDOHZwcG4xb3JWcDZ2MFNVZFk0YmpzRzZIU2ZkcGRMWVY4RFJmd3VYNFFiUnVibGJzQ1NGbmhrQ1ZlZkU6RUJWY0s4ZWdwX2Z5MVM4MkJQajMzQlFtb1hjRlEzRUNPSVdTWlIxWnYwM0NkZHh5NEtQNlpkUkpjdlJKQWxfeFo2V0NFVk1HNjNoUUN4ZF8=";
  private authData:PayPalAuthResponse;
  private appUrl:string;
  private dollarRate=0;
  constructor(private http:HttpClient,private currancy:CurrencyService) { 
    //this.appUrl=this.location.prepareExternalUrl(this.location.path());
  }
  init(app_token:string,url:string="http://localhost:4200"){
    this.appUrl=url;
    this.appToken=app_token;
    //var headers=new HttpHeaders("Host: data.fixer.io").set("Cache-Control","no-cache").set('shceme','http');
    this.currancy.getCurrancyPrice('EGP').subscribe(
      next=>{
        this.dollarRate=next.rates.EGP;
        });
    // this.http.get("http://openexchangerates.org/api/latest.json?app_id=4cdc495852594edc823763ee0a07061f&symbols=EGP").map(result=>new CurrancyCharge(result)).subscribe(
    //   next=>{
    //     if('rates' in next){
    //       this.dollarRate=next.rates.EGP;
    //       //console.log(this.dollarRate);
    //     }
    //   }
    // )
  }

  generatePayment(amount:number,invoiceid:string,callBack:any){
    var headers=new HttpHeaders("Authorization:Basic "+this.appToken).set('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post("https://api.paypal.com/v1/oauth2/token","grant_type=client_credentials",{headers}).map(result=>new PayPalAuthResponse(result)).subscribe(
              tokenData=>{
                var paymentHeaders=new HttpHeaders("Authorization: Bearer " + tokenData.access_token).set('Content-Type','application/json');
                this.payment={
                  intent:"sale",
                  payer:{
                    payment_method:'paypal'
                  },
                    transactions:[
                      {
                        amount:{total:parseFloat((amount/this.dollarRate).toString()).toFixed(2),currency:"USD"},
                      }
                    ],
                    redirect_urls:{
                      return_url:this.appUrl+"/invoice/"+invoiceid+"?result=success",
                      cancel_url:this.appUrl+"/invoice/"+invoiceid+"?result=error",
                    }

                  };

                this.http.post("https://api.paypal.com/v1/payments/payment",this.payment,{headers:paymentHeaders}).map(result=>new PayPalPayment(result)).subscribe(
                resp=>{
                  if(resp.state=="created"){
                    this.payment=resp
                    callBack(resp);
                  }
                    else{

                    }
                });
              }
              
            );
  }
  pay(){
    window.location.href=this.payment.links.filter(a=>a.rel=="approval_url")[0].href;
  }
   
  excute(paymentId,payerId,callBack){

    var headers=new HttpHeaders("Authorization:Basic "+this.appToken).set('Content-Type', 'application/x-www-form-urlencoded');
 this.http.post("https://api.paypal.com/v1/oauth2/token","grant_type=client_credentials",{headers}).map(result=>new PayPalAuthResponse(result)).subscribe(
              tokenData=>{
                var executeHeaders=new HttpHeaders("Authorization: Bearer " + tokenData.access_token).set('Content-Type','application/json');

    this.http.post("https://api.paypal.com/v1/payments/payment/"+paymentId+"/execute",{payer_id:payerId},{headers:executeHeaders}).map(result=>new PayPalPayment(result)).subscribe(
      resp=>{
        if(resp.state.toUpperCase()=="APPROVED"){
          callBack(resp);
        }
          else{

          }
      });
      });
  }

}

 
  export class PayPalPayment{
    id?:string;
    state?:string;
    intent?: string="sale";
    redirect_urls:PayPalRedirectURLs={return_url:'',cancel_url:''};
    payer?:PayPalPayer={}
    transactions: PayPalTransaction[]=[]
    create_time?:string;
    links?:PayPalLink[];
    constructor(obj:any){
      this.id=obj.id;
      this.state=obj.state;
      this.intent=obj.intent;
      this.redirect_urls=obj.redirect_urls;
      this.payer=obj.payer;
      this.transactions=obj.transactions;
      this.create_time=obj.create_time;
      this.links=obj.links;
    }
    }
export class PayPalLink{
  href?: string;//"https://api.paypal.com/v1/payments/payment/{id}/execute",
  rel?: string;//"execute","approval_url","self",
  method?: string;//"POST","GET"
}
export class PayPalTransaction{
  amount: PayPalAmount;
  related_resources?:any[];
}
export class PayPalAmount {
  total: string;
  currency?: string="USD";
}
export class PayPalPayer {
    payment_method?: string ="paypal"
  }
export class PayPalRedirectURLs {
  return_url?: string;
  cancel_url?: string;
};
export class PayPalAuthResponse{
    scope: string;
    nonce: string;
    access_token: string;
    token_type: string;
    app_id: string;
    expires_in: number
    constructor(obj:any){
      this.scope=obj.scope;
      this.nonce=obj.nonce;
      this.access_token=obj.access_token;
      this.token_type=obj.token_type;
      this.app_id=obj.app_id;
      this.expires_in=obj.expires_in;
    }
}
