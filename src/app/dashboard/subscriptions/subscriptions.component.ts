import { CallapiService } from './../../services/callapi.service';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from './../../services/shared.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  data:any[]=[];
  dtOptions: DataTables.Settings = {};
  permission:any={};

  constructor(private pageTitleService: Title, 
              private route: Router, 
              private shared: SharedService,
              public translate: TranslateService,
              private call:CallapiService) {

               }

  ngOnInit() {
    this.pageTitleService.setTitle('Subscriptions');
    this.hasAccess();
    this.loadData();
  }
  hasAccess(){
    this.call.postRequest("/User/HasAccess", [
        {'Screen':'Subscription', 'Method':'All'},
        // {'Screen':'Subscription', 'Method':'Add'},
        // {'Screen':'Subscription', 'Method':'Edit'},
        {'Screen':'Subscription', 'Method':'Delete'}
        ],
        next=>{
            this.permission=next;
        }
    )
}

modalClose( $event=null ) {
    console.log($event); // { submitted: true }
}
  loadData(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
          this.call.postRequest("/Subscription/All" ,dataTablesParameters,
              next=>{
                   
                  this.data=next.data;
                  //console.log(next);
                  callback({
                      recordsTotal: next.recordsTotal,
                      recordsFiltered: next.recordsFiltered,
                      data: []
                  });

          }
      )
      },
      columns: [ 
                  { data: 'email' }, 
                //   { data: 'created_at' }, 
                  ],
  }
  
  }

  deleteItem(item:any){
      if(!confirm("Are you sure delete this email?")) return;
    this.call.postRequest("/Subscription/Delete/" + item.id ,"",
              next=>{
                    let index=this.data.indexOf(item);
                    this.data.splice(index,1);   
                
                });
  }

}
