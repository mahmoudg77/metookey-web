import { CallapiService } from './../services/callapi.service';
import { Component, NgZone } from '@angular/core';
import { SharedService } from 'app/services/shared.service';
declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'new-arrivals',
    templateUrl: 'new-arrivals.component.html',
    styleUrls: ['new-arrivals.component.scss']
})
export class NewArrivalsComponent {
    newArrivals:any[];
    start:number=0;
    length:number=2;
    constructor( 
            private shared: SharedService,
            private call:CallapiService,
            private ngZone:NgZone
        ) {

}

ngOnInit() {
    this.loadNewArrivals();
}
loadNewArrivals(){
    this.call.postRequest("/item/all",{length:10},
    next=>{
        this.newArrivals=next.data
        // for (let index = 0; index < next.data.length; index++) {
        //     //this.newArrivals[index]=next.data[index];  
            
        // }
        this.ngZone.runOutsideAngular(()=>{

            this.jQueryLoad(); 
        })
    });
}
next(){
    if((this.start+this.length)>=10) return;
        this.start+=this.length;
}
back(){
   if(this.start<this.length) return;
        this.start-=this.length;
        
}

jQueryLoad(){
    var $this=this;
    $(function(){
        var res={};

     
        if($this.shared.isLeadSent()){
            res={
                0:{
                    items:1
                },
                1000:{
                    items:2
                },
                1200:{
                    items:4
                }
            }
        } else{
            res={
                0:{
                    items:1
                },
                1000:{
                    items:2
                }
            }
        }
      var slider= $("#newarrival_slider .owl-carousel").owlCarousel(
        {
            loop:true,
            margin:10,
            nav:false,        
            dots: true,
            autoplay:true,
            responsiveClass:true,
            dotsContainer: '#carousel-custom-dots',
            responsive:res
        }
    );
    $("#newarrival_slider .owl-next").click(function(){slider.trigger('next.owl');});
    $("#newarrival_slider .owl-prev").click(function(){slider.trigger('prev.owl');});
  
    })
    
  }
}
