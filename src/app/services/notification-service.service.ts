import { Router } from '@angular/router';
import { CallapiService } from './callapi.service';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {
  is_started:boolean;
  interval:number=10000
  inbox:any[]=[[],[],[],[]];
  count:any[]=[0,0,0,0];
  nextIndex=0;
  
  constructor(
    private call:CallapiService,
    private shared:SharedService,
    private router:Router

  ){
    //this.start();
   }

   
  start(interval:number=null){
    if(interval!=null) this.interval=interval;
    
    this.is_started=true;
    for(let x=0;x<this.inbox.length;x++)this.getTop5(x);

    setTimeout(()=>{
      this.getInbox();
    },this.interval)
  }
  
  stop(){
    this.is_started=false;
  }


  getCount(index:number=0){
    var total=0;
    // if(index==-1){
      
    //   this.inbox.forEach(itm=>{
    //     total+=itm.filter(a=>a.seen_at==null).length;
    //   });

    // }else{
      
      var itm:any[]=this.inbox[index]
      total=itm.filter(a=>a.seen_at==null).length;
    // }
    this.count[index]=total;
  }
  getTop5(index:number=0){
    if(this.shared.isLogin())
    this.call.postRequest("/Notifications/All?notify_type_id="+(index+1),{length:6},
      next=>{
        next.data.forEach(item => {
          const screen=(<string>item.link).split('/')[0];
          const id=(<string>item.link).split('/')[1];
            if(screen.toLowerCase()=="item"){
              item.link="/product/details/"+id;
            }
          });
          this.inbox[index]=next.data;
          for (let index = 0; index < this.inbox.length; index++) {
            this.getCount(index);
          }
        }
        ,
        error=>{
        
        });
  }
  seen(notify:any){
    this.call.postRequest("/Notifications/seen/"+notify.id,"",
    next=>{
      notify.seen_at=new Date();
        for (let index = 0; index < this.inbox.length; index++) {
          this.getCount(index);
        }
      }
    )
  }
  getInbox(index:number=0){
    if(!this.shared.isLogin()) {
      this.is_started=false;
      return;
    }
    this.call.postRequest("/Notifications/Inbox?notify_type_id="+(index+1),"",
      next=>{
        next.forEach(item => {
          const screen=(<string>item.link).split('/')[0];
          const id=(<string>item.link).split('/')[1];

          if(screen.toLowerCase()=="item"){
            item.link="/product/details/"+id;
          }
          if(this.inbox[index].filter(i=>i.id==item.id).length==0) {
            this.inbox[index].splice(0, 0, item);
            this.shared.notify(item.body,item.sender_name,next=>{
              this.router.navigateByUrl(item.link);
              this.seen(item);
            });
          }
        });
        
        for (let index = 0; index < this.inbox.length; index++) {
          this.getCount(index);
        }
        if(index<3)index++;
        else if(index>=3)index=0;
        if(this.is_started){
          setTimeout(()=>{
            this.getInbox(index);
          },this.interval);
        }
      },
      error=>{
        if(index<3)index++;
        else if(index>=3)index=0;
        setTimeout(()=>{
          this.getInbox(index);
        },this.interval);
      }
    )
    
  }
}
