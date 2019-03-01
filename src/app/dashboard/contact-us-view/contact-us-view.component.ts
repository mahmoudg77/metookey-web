import { ActivatedRoute, Router } from '@angular/router';
import { CallapiService } from './../../services/callapi.service';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'app/services/shared.service';

@Component({
    moduleId: module.id,
    selector: 'contact-us-view',
    templateUrl: 'contact-us-view.component.html',
    styleUrls: ['contact-us-view.component.scss']
})
export class ContactUsViewComponent implements OnInit {
    
    data:any;
    
    constructor(
        private call:CallapiService,
        private shared:SharedService,
        private router:ActivatedRoute,
        private route:Router
    ){
        
    }
    ngOnInit(): void {
        this.router.params.subscribe(params=>{
            const id=+params['id']||0;
            if(id>0){
                this.call.postRequest("/ContactUs/Item/"+id,"",
                next=>{
                    this.data=next;
                });
            }
        });
    }
    modalClose( $event=null ) {
        this.route.navigate([{outlets: {modal: null}}]);

   }
}
