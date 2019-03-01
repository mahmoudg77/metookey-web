import { CallapiService } from './../services/callapi.service';
import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
declare var $:any;
@Component({
    moduleId: module.id,
    selector: 'category-section',
    templateUrl: 'category-section.component.html',
    styleUrls: ['category-section.component.scss']
})
export class CategorySectionComponent implements OnInit{
    rundomID: number;
    ngOnInit(): void {
        this.loadCategory();
        this.loadItems();
        this.rundomID= Math.floor(Math.random() * 10000);
    } 
    @Input() alt:boolean=false;
    @Input() id:number=0;
    public category:any={};
    customOptions: any = {};
    sliderResponse={"draw": 0,
                    "recordsTotal": 0,
                    "recordsFiltered": 0,
                    "data": []};
    sliderRequest={
        "draw": 0,
        "length": 16,
        "start": 0,
      };
    
        
    constructor(public shared:SharedService,private call:CallapiService){
        
    }
    loadCategory(){        
        if(this.id||0!=0)
        this.call.postRequest("/Category/Item/"+this.id,"",
        next=>{
                this.category=next; 
                
        });
    }

    loadItems(){
        if(this.id||0!=0)
        this.call.postRequest("/Item/AllByCategory?CategoryID="+this.id,this.sliderRequest,
                items=>{
                        this.sliderResponse=items; 
                        this.jQueryLoad();
                }) ;    
    }
    next(){
        // console.log(this.sliderRequest.start);
        // console.log(this.sliderResponse.recordsTotal);
        if((this.sliderRequest.start+4)>=this.sliderResponse.recordsTotal) return;
            this.sliderRequest.start+=4;
            
            //this.loadItems();
        
    }
    back(){
       if(this.sliderRequest.start<4) return;
            this.sliderRequest.draw--;
            this.sliderRequest.start-=4;
            
            //this.loadItems();
       // }
       
    }
    jQueryLoad(){
        var _this=this;
        $(function(){
          var slider= $("#slider_"+_this.rundomID+" .owl-carousel").owlCarousel(
            {
                loop:false,
                margin:20,
                nav:false,        
                dots: false,
                autoplay:false,
                responsiveClass:true,
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:2
                    },
                    1000:{
                        items:4
                    }
                }
            }
        );
        $("#slider_"+_this.rundomID+" .owl-next").click(function(){slider.trigger('next.owl');});
        $("#slider_"+_this.rundomID+" .owl-prev").click(function(){slider.trigger('prev.owl');});
      
        })
        
      }
}
