import { ExcelService } from './../../services/excel.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SharedService } from 'app/services/shared.service';
import { CallapiService } from 'app/services/callapi.service';
import { DataTableDirective } from 'angular-datatables';

// declare var DTInstances:any;
@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.scss']
})
export class ViewRequestsComponent implements OnInit {
  reqs: any[]=[];
  dtOptions: any = {};
  fromDate:Date=new Date('2000-01-01');
  toDate:Date=new Date();
  @ViewChild(DataTableDirective) dtInstance:DataTableDirective;
  constructor(
              private title: Title, 
              private call:CallapiService, 
              public shared: SharedService,
              private excel:ExcelService,
              ) { 
    }

    ngOnInit():void {
      this.title.setTitle('Lead Requests');
      var _this=this;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        serverSide:true,
        processing: true,
        dom: 'Bfrtip',
        buttons: [
          'pageLength',
          'colvis',
          'copy',
          'print',
          'excel',
          ],
        columns: [ 
          {data:'id',title:"No."},
          {data:'main',title:"Main"},
          {data:'parent',title:"Parent"},
          {data:'category',title:"Category"},
          {data:'notes',title:"Notes"},
          {data:'price_from',title:"From Price"},
          {data:'price_to',title:"To Price"},
          {data:'date_of_birth',title:"DOB"},
          {data:'mobile',title:"Mobile"},
          {data:'email',title:"Email"},
          {data:'register_time',title:"Register Date"},
          {data:'name',title:"Account"},
          {data:'country' ,title:"Country"},
          {data:'city',title:"City"},
          {data:'gender',title:"Gender"},
          {data:'facebook',title:"Facebook"},
          {data:'twitter',title:"Twitter"},
          {data:'instagram',title:"Instagram"},
          {data:'google',title:"Google"},
          {data:'phone',title:"Phone"},
        ],
        deferRender:true,
        ajax : (dataTablesParameters: any, callback) => {
          var api="/Requests/All"
          var filter="";
          //"?fromDate=" + this.fromDate + "&toDate="+this.toDate;
          if(this.fromDate!=null){
            filter+=(filter==""?"?":"&")+"fromDate=" + this.fromDate;
          }
          if(this.toDate!=null){
            filter+=(filter==""?"?":"&")+"toDate=" + this.toDate;
          }
          this.call.postRequest(api+filter,dataTablesParameters,
              next=>{
                   
                  this.reqs=next.data;
                  //console.log(next.data);
                  if(callback)
                  callback({
                      recordsTotal: next.recordsTotal,
                      recordsFiltered: next.recordsFiltered,
                      data: next.data
                  });
    
                }
          )
          
        
      
      }
    }
    }
  


  loadData(){
    if(this.dtInstance) {
      this.dtInstance.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.ajax.reload();
      });
    }
  }
}
