import { Component, Input, OnInit, NgZone } from '@angular/core';
import { SharedService } from 'app/services/shared.service';
import { DecimalPipe } from '@angular/common';
declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'item-price-plan',
    templateUrl: 'item-price-plan.component.html',
    styleUrls: ['item-price-plan.component.scss']
})
export class ItemPricePlanComponent implements OnInit {
    public items:number[]=[];
    quantity:number=200;
    orders:number=100;
 
    start:Date;
    end:Date;
    price:number;
    price_offer:number;
    waitingTime: string;
    day: string="00";
    hour: string="00";
    minute: string="00";
    second: string="00";
    plans: any[];
    constructor(private ngzone:NgZone,
        public shared:SharedService){
    }
   
  
    public load(s,e,q,o,p,op){
        this.start=s;
        this.end=e;
        this.quantity=q;
        this.orders=o;
        this.price=p;
        this.price_offer=op;
        this.calcWaitingTime();
        this.clacPricePlan();
    }
    ngOnInit(): void {
      
    }
    clacPricePlan(): any {
        this.plans=[];
        var d=this.quantity / 5;
        console.log(this.quantity);
        this.plans.push({off:this.calculateOff(d*2),count:d*2});
        this.plans.push({off:this.calculateOff(d*3),count:d*3});
        this.plans.push({off:this.calculateOff(d*4),count:d*4});
        
    }
   
    calcWaitingTime(){
        var date=new Date();
        //console.log(d,this.lastDate);
        //console.log(new Date(new Date(this.lastDate).getTime() +(24*60*60000)));

        var total=this.shared.dateDiff("s",new Date(new Date(this.end).getTime() +(24*60*60000)),date.toString());
        //total+=24*60*60;
      //console.log(total);
      //var h=Math.floor((total % (60 * 60))
        if(total<=0){
            this.day    = "00"; 
            this.hour   ="00" 
            this.minute ="00" 
            this.second ="00" ;
            return;
        }
        var v=total / (60 * 60 * 24);
        var d=Math.floor(v);
        v=(v-d)*24;
        var h=Math.floor(v);
        v=(v-h)*60;
        var m=Math.floor(v);
        v=(v-m)*60;
        var s=Math.floor(v);
        var format:DecimalPipe=new DecimalPipe("en");
        this.day=  format.transform(d,'2.0') 
        this.hour=  format.transform(h,'2.0') 
        this.minute=format.transform(m,'2.0') 
        this.second=format.transform(s,'2.0') ;
        
        setTimeout(()=>{
            this.calcWaitingTime();
        },100);
    }

    calculateLeftDays(index){
        
       var days= this.shared.dateDiff('d',this.end,this.start)
        if(days<0) 
        {
            return 0;
        }
        return days*(this.orders-index+1)/this.orders;
    }
    calculateOff(index){
        const total=this.price-this.price_offer;
        if(total<0) 
        {
            return 0;
        }
        //var format:DecimalPipe=new DecimalPipe("en");

        return (total)*100/this.price;
        //return (total*index/this.quantity)*100/this.price;
    }
    // calculatePrice(index){
    //    var off = this.calculateOff(index);
        
    //    return this.price*(1-(off/100));
    // }
     getOrders(){
        this.items=[];
        for (let index =1; index <= this.orders; index++) {
            this.items.push(index);
        }
        return this.items;

     }
 
}
class tipValues{
    purchased:number;
    leftQty:number;
    leftDays:number;
    off:number;
}