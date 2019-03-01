import { CallapiService } from './../services/callapi.service';
import { SharedService } from 'app/services/shared.service';
import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
declare var $:any;
@Component({
    moduleId: module.id,
    selector: 'customer-leads',
    templateUrl: 'customer-leads.component.html',
    styleUrls: ['customer-leads.component.scss']
})
export class CustomerLeadsComponent implements OnInit {
    roots:any[];
    parents:any[];
    categories:any[];
    root_id:number;
    parent_id:number;
    data:any={};
    waitingTime: any;
    allow:boolean=true;
    lastDate: any;
    loaded:boolean=false;
    constructor(
        public shared:SharedService,
        private call:CallapiService,
    ){

    }
    ngOnInit(): void {
        this.loadRoots();
       if(this.shared.isLogin()) {
           this.loadWaitingTime();
       }else{
        this.loaded=true;
       }
    }

    loadWaitingTime(){
        this.call.postRequest("/Requests/LastDate","",
            next=>{
                this.lastDate=next;
                this.loaded=true;
                if(next.data=="0001-01-01T00:00:00"){
                    this.allow=true;
                }
                else{
                    this.allow=false;
                    this.calcWaitingTime();
                }
                //this.waitingTime=next.data;
                
            },
            error=>{
                this.loaded=true;
            }
        );
    }
    calcWaitingTime(){
        var d=new Date();
        //console.log(d,this.lastDate);
        //console.log(new Date(new Date(this.lastDate).getTime() +(24*60*60000)));

        var total=this.shared.dateDiff("s",new Date(new Date(this.lastDate).getTime() +(24*60*60000)),d.toString());
        //total+=24*60*60;
      //console.log(total);
      //var h=Math.floor((total % (60 * 60))
        var v=total / (60 * 60);
        var h=Math.floor(v);
        v=(v-h)*60;
        var m=Math.floor(v);
        v=(v-m)*60;
        var s=Math.floor(v);
         var format:DecimalPipe=new DecimalPipe("en");
        this.waitingTime=  format.transform(h,'2.0') + " : " + format.transform(m,'2.0') +" : " + format.transform(s,'2.0') ;
        if(total<=0){
            this.allow=true;
            return;
        }
        setTimeout(()=>{
            this.calcWaitingTime();
        },1000);
    }
    loadRoots(){
        this.call.postRequest("/RequestCategory/All?parent_id="+0,{length:1000},
        next=>{
            this.roots=next.data;
        }
        );
    }
    loadParents(parent_id:number){
        this.call.postRequest("/RequestCategory/All?parent_id="+parent_id,{length:1000},
        next=>{
            this.parents=next.data;
        }
        );
    }
    loadCategories(parent_id:number){
        this.call.postRequest("/RequestCategory/All?parent_id="+parent_id,{length:1000},
        next=>{
            this.categories=next.data;
        }
        );
    }

    sendRequest()
    {
            this.call.postRequest("/Requests/Add" , this.data,
            response=>{
                this.shared.success("Save success");
                this.data={};
                this.loadWaitingTime();
            },
            error=>{
                this.shared.error(error);
            });
        
    }
  

}
