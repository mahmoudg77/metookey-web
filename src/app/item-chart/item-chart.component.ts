import { Component, Input, OnInit, NgZone } from '@angular/core';
import { SharedService } from 'app/services/shared.service';
declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'item-chart',
    templateUrl: 'item-chart.component.html',
    styleUrls: ['item-chart.component.scss']
})
export class ItemChartComponent implements OnInit {
    public items:number[]=[];
    quantity:number=200;
    orders:number=100;
 
    start:Date;
    end:Date;
    price:number;
    price_offer:number;
    tooltips: tipValues[];
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
        this.tooltips=[];
        for (let index = 0; index < this.orders; index++) {
            this.tooltips.push({purchased:index+1,leftQty:this.quantity-index-1,leftDays:this.calculateLeftDays(index),off:this.calculateOff(index)})
        }
        this.ngzone.onMicrotaskEmpty.subscribe(()=>{
            $('[data-toggle="tooltip"]').tooltip({html:true});
            $('[data-toggle="tooltip"]').prop('title','');
            //$('#laststep').tooltip('show');
        //$('[data-toggle="popover"]').click();
        });
    }
    ngOnInit(): void {
        //this.calculateLeftDays();
        

        
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

        return (total*index/this.quantity)*100/this.price;
    }
    calculatePrice(index){
       var off = this.calculateOff(index);
        
       return this.price*(1-(off/100));
    }
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