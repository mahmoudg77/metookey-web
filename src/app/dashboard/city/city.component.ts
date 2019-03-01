import { GeneralModalService } from './../../services/general-modal.service';
import { CallapiService } from './../../services/callapi.service';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from './../../services/shared.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  data:any[]=[];
  dtOptions: DataTables.Settings = {};
  permission:any={};

  constructor(private pageTitleService: Title, 
              private route: Router, 
              private shared: SharedService,
              public translate: TranslateService,
              private call:CallapiService,
              ) {

               }

  ngOnInit() {
    this.pageTitleService.setTitle('Cities');
    this.hasAccess();
    this.loadData();
  }
  hasAccess(){
    this.call.postRequest("/User/HasAccess", [
        {'Screen':'City', 'Method':'Add'},
        {'Screen':'City', 'Method':'Edit'},
        {'Screen':'City', 'Method':'Delete'}
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
          this.call.postRequest("/City/All" ,dataTablesParameters,
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
                  { data: 'country_name' }, 
                  { name: 'Action',orderable:false,searchable:false }],
  }
  
  }

  deleteItem(item:any){
      if(!confirm("Are you sure delete this city?")) return;
    this.call.postRequest("/City/Delete/" + item.id ,"",
              next=>{
                    let index=this.data.indexOf(item);
                    this.data.splice(index,1);   
                
                });
  }

  
}
