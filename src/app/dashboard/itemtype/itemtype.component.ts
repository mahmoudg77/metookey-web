import { CallapiService } from './../../services/callapi.service';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from './../../services/shared.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-itemtype',
  templateUrl: './itemtype.component.html',
  styleUrls: ['./itemtype.component.scss']
})
export class ItemtypeComponent implements OnInit {
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
    this.pageTitleService.setTitle('Product Types');
    this.hasAccess();
    this.loadData();
  }
  hasAccess(){
    this.call.postRequest("/User/HasAccess", [
        {'Screen':'ItemType', 'Method':'Add'},
        {'Screen':'ItemType', 'Method':'Edit'},
        {'Screen':'ItemType', 'Method':'Delete'}
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
          this.call.postRequest("/ItemType/All" ,dataTablesParameters,
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
                  { name: 'Action',orderable:false,searchable:false }],
  }
  
  }

  deleteItem(item:any){
      if(!confirm("Are you sure delete this type?")) return;
    this.call.postRequest("/ItemType/Delete/" + item.id ,"",
              next=>{
                    let index=this.data.indexOf(item);
                    this.data.splice(index,1);   
                
                });
  }

}
