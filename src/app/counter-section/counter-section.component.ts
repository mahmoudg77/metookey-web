import { CallapiService } from 'app/services/callapi.service';
import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'counter-section',
    templateUrl: 'counter-section.component.html',
    styleUrls: ['counter-section.component.scss']
})
export class CounterSectionComponent {
counter:any={};
// @ViewChild('counter1') counter1:ElementRef;
// @ViewChild('counter2') counter2:ElementRef;
// @ViewChild('counter3') counter3:ElementRef;
// @ViewChild('counter4') counter4:ElementRef;
// @ViewChild('counter5') counter5:ElementRef;
constructor(private api:CallapiService,private ngzone :NgZone){

}
ngOnInit(){
    this.api.getRequest("/statistic/GetStatus","",
    next=>{
        this.counter=next;
        // this.counter1.nativeElement.innerText=this.counter.all_products;
        // this.counter2.nativeElement.innerText=this.counter.success_orders;
        // this.counter3.nativeElement.innerText=this.counter.success_quantity;
        // this.counter4.nativeElement.innerText=this.counter.online_users;
        // this.counter5.nativeElement.innerText=this.counter.all_users;

       this.ngzone.runOutsideAngular(()=>{
           this.jQuaryFunction();
       }) 
         
    });

    
}
jQuaryFunction(){
    var _this=this;
    $(function() {
        
        // $('.counter').counterUp({
        //     delay: 10,
        //     time: 1000
        // });


        countup("#counter1",_this.counter.all_products);
        countup("#counter2",_this.counter.success_orders);
        countup("#counter3",_this.counter.success_quantity);
        countup("#counter4",_this.counter.online_users);
        countup("#counter5",_this.counter.all_users);


        // $('.counter').each(function() {
        //     var $this = $(this),
        //         countTo = $this.attr('data-count');
            
        //     $({ countNum: $this.text()}).animate({
        //       countNum: countTo
        //     },
          
        //     {
          
        //       duration: 8000,
        //       easing:'linear',
        //       step: function() {
        //         $this.text(Math.floor(this.countNum));
        //       },
        //       complete: function() {
        //         $this.text(this.countNum);
        //         //alert('finished');
        //       }
          
        //     });  
            
            
          
        //   });
    });
    function countup(el,countTo){
        var $this = $(el);
 
        $({ countNum: $this.text()}).animate({
        countNum: countTo
        },
    
        {
    
        duration: 8000,
        easing:'linear',
        step: function() {
            $this.text(Math.floor(this.countNum));
        },
        complete: function() {
            $this.text(this.countNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            //alert('finished');
        }
    
        });  
    }
}
}
