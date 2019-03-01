import { PaypalService } from './../services/paypal.service';
import { environment } from './../../environments/environment';
import { CallapiService } from './../services/callapi.service';
import { SharedService } from './../services/shared.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { GlobalData } from 'app/services/global-data';
import { Router, ActivatedRoute } from '@angular/router';
declare var $ :any;

@Component({
    moduleId: module.id,
    selector: 'invoice',
    templateUrl: 'invoice.component.html',
    styleUrls: ['invoice.component.scss']
})
export class InvoiceComponent implements OnInit{
    data:any={};
    env=environment;
    id: number=0;
    recentOrders:any[];
    payResult: any;
    ppid: any;
    global=GlobalData;
    payerId: any;
    notExists: boolean;
    constructor(
        private shared:SharedService,
        private call:CallapiService,
        private router:Router,
        private currentRoute:ActivatedRoute,
        private ngZone: NgZone,
        private paypal:PaypalService
    ){
        this.paypal.init(btoa(this.global.settings.paypal_appid + ":" + this.global.settings.paypal_secret_key),
        this.shared.appUrl());

    }

    ngOnInit(): void {
        this.currentRoute.params.subscribe(next=>{
            this.id=+next['id']||0;
            this.currentRoute.queryParams.subscribe(query=>{
                this.payResult=query['result']||"";
                
                this.ppid=query['paymentId']||""; //paypal payment id
                this.payerId=query['PayerID']||""; //paypal payment id

                if(this.payResult=="success" || this.payResult==""){
                    
                }else if(this.payResult=="error"){
                    return ;
                }

                if(this.ppid!="")
                    this.saveStatus();
                else
                    this.getOrder();

                this.getRecentOrders();
            });
        })

    }

    saveStatus(){
        // if(this.ppid!="" && this.data.payed_by_method==this.ppid){

            this.paypal.excute(this.ppid,this.payerId,res=>{
                this.call.postRequest("/Orders/ppi/"+ this.id + "?pid=" + this.ppid,{email:res.payer.payer_info.email,payer:JSON.stringify(res.payer)},
                next=>{
                    if(next)
                    this.getOrder();                
                });
            });
           
        // }
    }
    getOrder(){
        //console.log(this.id);
        
        this.call.postRequest("/Orders/item/"+ this.id,"",
        next=>{
            this.data=next;
            this.data.payer_phone=this.data.payer_phone=='NaN'?'':this.data.payer_phone;
        },
        error=>{
            this.notExists=true;
            this.shared.error("This invoice not exists!");
        })
    }
    getRecentOrders(){
        //console.log(this.id);
        this.call.postRequest("/Orders/MyOrders",{length:8},
        next=>{
            this.recentOrders=next.data;
                 this.jQueryLoad();
            
        })
    }

    jQueryLoad(){
        var $this=this;
        $(function(){
        var slider= $("#myCarousel .owl-carousel").owlCarousel(
            {
                loop:true,
                margin:10,
                nav:false,        
                dots: false,
                autoplay:true,
                responsive:{
                    0:{
                        items:1
                    },
                    800:{
                        items:($this.recentOrders.length>1)?2:1,
                    },
                    // 1000:{
                    //     items:2
                    // }
                }
            }
        );
        $("#myCarousel .carousel-control-next").click(function(){slider.trigger('next.owl');});
        $("#myCarousel .carousel-control-prev").click(function(){slider.trigger('prev.owl');});

    });
}

    print(){
        window.print();
    }
}
