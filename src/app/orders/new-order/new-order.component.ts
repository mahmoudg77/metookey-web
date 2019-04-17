import { PaypalService } from './../../services/paypal.service';
import { environment } from './../../../environments/environment';
import { CallapiService, apiResult } from './../../services/callapi.service';
import { SharedService } from './../../services/shared.service';
import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalData } from 'app/services/global-data';
import * as Payment from 'payment';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CurrencyService } from 'app/services/currency.service';
import { NgxBraintreeComponent } from 'ngx-braintree';
import { Guid } from 'guid-typescript';
import { AuthService } from 'app/services/auth.service';


declare var $:any;
class order{
  id:number;
  item_id:number;
  quantity:number;
  insurance_value:number;
  payment_method_id:number=1;
  shipping_address_id:number;
  payed_by_method: any;
  
  // user_id:number;
  // current_price:number;
  // created_at:Date;

}
@Component({
    moduleId: module.id,
    selector: 'new-order',
    templateUrl: 'new-order.component.html',
    styleUrls: ['new-order.component.scss']
})
export class NewOrderComponent  implements OnInit{
    itemDetails: any={};
    codeSent: boolean;
    mobileVerified: any;
    newContact: any={};
    order: order=new order();
    env=environment;
    visaDetailds:any={cardname:'',cardNumber:'',expireYear:0,expireMonth:0};
    paypalemail:string;
    yearRange:number[]=[];
    countries: any[];
    cities: any[];
    oldShippingAddress:any=null;
    newShippingAddress:any={};
    optShippingAddress:number=0;
    optContact:number=0;
    //payment=Payment;
    PayPalPayment={
        intent: "sale",
        redirect_urls: {
          return_url: "",
          cancel_url: ""
        },
        payer: {
          payment_method: "paypal"
        },
        transactions: [{
          amount: {
            total: "0",
            currency: "EGP"
          }
        }]
      }

      bt:any;
    public  global=GlobalData;
    step: number=0;
    CurrentRate:number=1;

    @ViewChild(NgxBraintreeComponent)braintree:NgxBraintreeComponent;
    submitted: boolean;
    constructor(
        public shared:SharedService,
        private call:CallapiService,
        private router:Router,
        private route:ActivatedRoute,
        private ngzone:NgZone,
        private location:Location,
        private paypal :PaypalService,
        private http:HttpClient,
        private currency:CurrencyService,
        private auth:AuthService
    ){

    }


    ngOnInit(){
        
        var doCheck=true;
        this.route.queryParams.subscribe(params=>{
            this.order.item_id=+params['item_id']||0;
            this.order.quantity=+params['qty']||1;
            this.currency.getCurrancyPrice('EGP').subscribe(
                next=>{
                    this.CurrentRate=next.rates.EGP;
                }
            )
            console.log("User Token=",params['user_token'])
            const token=Guid.parse(params['user_token']);
            if(token!=null){
                this.shared.setToken(token.toString());
            }else{
                this.shared.error("Invalid Token !");
                doCheck=false;
            }

           if(this.shared.getUser().mobile==null || this.shared.getUser().mobile!='') this.optContact=1;
        },
        ()=>{
            if(doCheck)this.auth.checkLogin();
        });
        // "QVRXMGY3VHA1UV9iazZ2WXJpcldpb3J6a3UwX1R6THJWM2NXUFZhSGEtekhSYWZwZkM2MnRJUmtBV0NRZnBPRHU4Vk03U3VFNlY0N1NFZnY6RUx6WmRiOUxVSFNNN24zcDliSEpGUzBEWkY4Q21JdFBVaWEtQnBMOVU3eWY3NDVveXVEWWJscWpPV05JWExMT21nc0p2cXBLUDJvWTBWSkI="
        
        this.paypal.init(btoa(this.global.settings.paypal_appid + ":" + this.global.settings.paypal_secret_key),
                        this.shared.appUrl());

        this.loadCountries();
        
        this.loadItemDetails();
        this.loadOldShippingAddress();
        // var d=new Date();
        // var start=d.getFullYear();
        // this.yearRange=[];
        // for(var i=0; i<=10;i++)this.yearRange.push(start+i);

        // Payment.formatCardNumber(document.querySelector('input.cc-num'));
        // Payment.formatCardExpiry(document.querySelector('input.cc-exp'));
        // Payment.formatCardCVC(document.querySelector('input.cc-cvc'));
        
        // $(".cc-num").click(function(){$(this).removeClass('alert-danger');});
    }

    loadItemDetails(){
        this.call.postRequest("/Item/Item/"+this.order.item_id,"",
        next=>{
            this.itemDetails=next;
        });
    }
    loadOldShippingAddress(){
        this.call.postRequest("/ShippingAddress/MyLast","",
        next=>{
            this.oldShippingAddress=next;
            if(next==null)this.optShippingAddress=1
            this.newShippingAddress=Object.assign({},next);
            this.newShippingAddress.id=0;
            this.order.shipping_address_id=next.id;

        },error=>{
            this.optShippingAddress=1;
        });
    }
    modalClose(evrnt){
        
    }
    saveShippingAddress(){
        this.call.postRequest("/ShippingAddress/Add",this.newShippingAddress,
        next=>{
            this.newShippingAddress=next;
            this.oldShippingAddress=Object.assign({},next);
            this.order.shipping_address_id=next.id;
            this.optShippingAddress=0;
        });
    }

    saveContact(){
        this.newContact.phone=this.newContact.land_key+this.newContact.land_phone
        if(this.global.settings.verify_mobile==1){
            this.call.postRequest("/User/VerifyMobile?Mobile="+this.newContact.mobile+"&Code="+this.newContact.verificationCode,"",
            next=>{
                this.mobileVerified=next;
                this.call.postRequest("/Account/SaveContact?mobile="+this.newContact.mobile +"&phone="+(this.newContact.phone||''),"",
                    next=>{
                        this.shared.getUser().mobile=this.newContact.mobile;
                        this.shared.getUser().phone=(this.newContact.phone==null && this.newContact.phone!="")?this.newContact.phone:this.shared.getUser().phone;
                        this.optContact=0;
                    });
            },
            error=>{
                this.shared.error(error);
            });
        }else{
            this.mobileVerified=true;
                this.call.postRequest("/Account/SaveContact?mobile="+this.newContact.mobile + ((this.newContact.phone==null && this.newContact.phone!="")?"":"&phone="+this.newContact.phone),"",
                    next=>{
                        this.shared.getUser().mobile=this.newContact.mobile;
                        this.shared.getUser().phone=(this.newContact.phone==null && this.newContact.phone!="")?this.newContact.phone:this.shared.getUser().phone;
                        this.optContact=0;
                    });
        }
        

        
    }

    sendVerificationCode(){
        if(this.global.settings.verify_mobile==1){
            if(this.newContact.mobile=="" || this.newContact.mobile==null) return;

            this.call.postRequest("/User/SendVerifyCode?Mobile="+this.newContact.mobile,"",
            next=>{
                this.codeSent=true;
            },
            error=>{
                this.shared.error(error);
            }            );
            
        }    
    }
    
    verifyMobile(){
        this.call.postRequest("/User/VerifyMobile?Mobile="+this.newContact.mobile+"&Code="+this.newContact.verificationCode,"",
        next=>{
            this.mobileVerified=next;
        });
    }


    

    saveOrder(){
      
        this.submitted=true;

        this.order.insurance_value=this.itemDetails.insurance_value*this.order.quantity;
        
        //paypal payment
        if(this.order.payment_method_id==3) 
            this.order.payed_by_method="PayPal_";//+this.paypalemail.replace(this.paypalemail.substr(1,4),"****");
        //Cach payment
        if(this.order.payment_method_id==1) 
            this.order.payed_by_method="Cash On Delivered";
        
        
        this.call.postRequest("/Orders/Add",this.order,
        next=>{
           //paypal payment
           if(this.order.payment_method_id==3) {
                this.paypal.generatePayment(this.order.insurance_value,next.id.toString(),
                payment=>{
                    this.call.postRequest("/Orders/ppp/"+next.id+"?pid="+payment.id,"",
                    next=>{
                        if(next){
                            this.paypal.pay();  
                        }
                    })
                });
           }else if(this.order.payment_method_id==1) {
               //Cash payment
            this.shared.closeModal("/invoice/"+next.id+"?result=success");
         }
          
        
        },
        error=>{
            this.shared.error(error);
            this.submitted=false;

        }
        );
    }

    loadCountries(){
       this.call.postRequest("/Country/All",{length:1000},
                   next=>{
                       this.countries=next.data; 
                       this.loadCities(this.countries[0].id) ;
                   })
   }
   loadCities(country_id:number){
       this.call.postRequest("/City/All",{length:1000,columns:[{data:'country_id',searchable:true}],search:{'regex':false,'Value':country_id.toString()}},
                       next=>{
                           this.cities=next.data;
                       })
   }
  

   getCCType(){
    return Payment.fns.cardType(this.visaDetailds.cardNumber);
   }

   getClientToken(gg:string): Observable<string> {
    let headers:HttpHeaders= new HttpHeaders({"APP_KEY":environment.apiKey});
    let lang="en";
    const url="/Checkouts/getNewToken";
    // if(this.shared.getToken()!=null && this.shared.getToken()!=undefined) headers= new HttpHeaders({"APP_KEY":environment.apiKey,"AUTH_KEY":this.shared.getToken()});
    
  return  this.call.http
                .get(environment.apiUrl + "/" + lang  + url ,{headers})
                .map((result:any)=>{
                    return <string>result.token;
                });
   
}

createPurchase(nonce: string, chargeAmount: number): Observable<any> {
 
    let headers:HttpHeaders= new HttpHeaders({"APP_KEY":environment.apiKey});
    let lang="en";
    const url="/Checkouts/Create";
    if(this.shared.getToken()!=null && this.shared.getToken()!=undefined) 
        headers= new HttpHeaders({  
                                    "APP_KEY":environment.apiKey,
                                    "AUTH_KEY":this.shared.getToken(),
                                });
    
        
 
    return this.call.http
      .post(environment.apiUrl + "/" + lang  + url, { nonce: nonce, chargeAmount: chargeAmount }, { 'headers': headers })
  	  .map((response: any) => {
            if(response.Errors!=null){
                this.shared.error(response.Message);
                this.step=0;
                //this.step=1;
                
            }
   	    return response;
  	 });
    }

    onPaymentStatus(event){
        if(event==null) return;

        if(!event.hasOwnProperty('Target') ) return;

        const params="?BrainTreeTargetId="+event.Target.Id;
        
        this.order.insurance_value=this.itemDetails.insurance_value*this.order.quantity;

        if(event.Target.ProcessorResponseText=="Approved"){
            this.call.postRequest("/Orders/Add"+params,this.order,
            next=>{
            //paypal payment
            console.log(next);
            this.shared.closeModal("/invoice/"+next.id+"?result=success");
            });
        }
    }
    nextStep(){
        $("#mobilnum").removeClass('alert-danger');
        if(this.optContact==1){
            this.shared.error('Please fill your contact !');
            $("#mobilnum").addClass('alert-danger');
            return;
        }
         
        if(this.optShippingAddress==1 && (this.order.shipping_address_id||0)==0){
            this.shared.error('Please add your shipping address !');
            //$("#mobilnum").addClass('alert-danger');
            return;
        }
        this.step=1;

    }
  
}
