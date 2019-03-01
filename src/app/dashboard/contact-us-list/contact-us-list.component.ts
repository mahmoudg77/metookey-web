import { CallapiService } from './../../services/callapi.service';
import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'app/services/shared.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    moduleId: module.id,
    selector: 'contact-us-list',
    templateUrl: 'contact-us-list.component.html',
    styleUrls: ['contact-us-list.component.scss']
})
export class ContactUsListComponent {
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
      this.pageTitleService.setTitle('Contact Us');
      this.hasAccess();
      this.loadData();
    }
    hasAccess(){
      this.call.postRequest("/User/HasAccess", [
          {'Screen':'ContactUs', 'Method':'Add'},
          {'Screen':'ContactUs', 'Method':'Edit'},
          {'Screen':'ContactUs', 'Method':'Delete'}
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
            this.call.postRequest("/ContactUs/All" ,dataTablesParameters,
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
                    { data: 'created_at' }, 
                    { data: 'acc_name' }, 
                    { data: 'subject' }, 
                    { data: 'section_name' }, 
                    { name: 'Action',orderable:false,searchable:false }],
    }
    
    }
  
    deleteItem(item:any){
        if(!confirm("Are you sure delete?")) return;
      this.call.postRequest("/ContactUs/Delete/" + item.id ,"",
                next=>{
                      let index=this.data.indexOf(item);
                      this.data.splice(index,1);   
                  
                  });
    }
  
}
