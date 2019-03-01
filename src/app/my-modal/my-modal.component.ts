import { Input, OnInit, OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
    moduleId: module.id,
    selector: 'my-modal',
    templateUrl: 'my-modal.component.html',
    styleUrls: ['my-modal.component.scss'],
    animations: [
        trigger('dialog', [
          transition('void => *', [
            style({ transform: 'scale3d(.3, .3, .3)' }),
            animate(100)
          ]),
          transition('* => void', [
            animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
          ])
        ])
      ]
})
export class MyModalComponent implements OnInit {
   
  
    @Input() icon:string;
    @Input() type:string;
    @Input() message:string;
    @Input() title:string;
    @Input() time:number=3000;

    brogress:number=100;
    animate: string;
    holdTimer:boolean=false;
    constructor(
        public activeModal:NgbActiveModal
        ){
              
    }

    ngOnInit(): void {
      // setTimeout(()=>{
      //   this.activeModal.close();
      // },this.time);
      this.timeDown();
    }
    close(event){
      this.animate="void";
      setTimeout(()=>{
        //document.querySelector(".modal-body").setAttribute("style","display:none");
        this.activeModal.close()
      },100);
    }
    timeDown(){

      if(!this.holdTimer)this.brogress=this.brogress-1;
      setTimeout(()=>{
        if(this.brogress<=0){
          this.close('Time Ended');
        }else{
          this.timeDown();
        }
      },this.time/100);
    }
    
    
  
    
    
}
