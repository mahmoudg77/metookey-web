import { CallapiService } from 'app/services/callapi.service';
import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'app/services/shared.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    moduleId: module.id,
    selector: 'contact-section',
    templateUrl: 'section.component.html',
    styleUrls: ['section.component.scss']
})
export class SectionComponent {
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
      this.pageTitleService.setTitle('Contact Us Sections');
      this.hasAccess();
      this.loadData();
    }
    hasAccess(){
      this.call.postRequest("/User/HasAccess", [
          {'Screen':'Section', 'Method':'Add'},
          {'Screen':'Section', 'Method':'Edit'},
          {'Screen':'Section', 'Method':'Delete'}
          ],
          next=>{
              this.permission=next;
          }
      )
  }
  
    loadData(){
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        serverSide: true,
        processing: true,
        ajax: (dataTablesParameters: any, callback) => {
            this.call.postRequest("/Section/All" ,dataTablesParameters,
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
                    { data: 'name' }, 
                    { data: 'contact_email' }, 
                    { name: 'Action',orderable:false,searchable:false }],
    }
    
    }
  
    deleteItem(item:any){
        if(!confirm("Are you sure delete?")) return;
      this.call.postRequest("/Section/Delete/" + item.id ,"",
                next=>{
                      let index=this.data.indexOf(item);
                      this.data.splice(index,1);   
                  
                  });
    }
}
