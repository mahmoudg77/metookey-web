import { environment } from './../../environments/environment';
import { DataTableDirective } from 'angular-datatables';
import { CallapiService } from 'app/services/callapi.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'app/services/shared.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'notification-list',
    templateUrl: 'notification-list.component.html',
    styleUrls: ['notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
    typeID:number=0;
    data:any[];
    dtOptions:any;
    env=environment;
    @ViewChild(DataTableDirective) dtInstance:DataTableDirective;

    constructor(
        private call:CallapiService,
        private shared:SharedService,
        private router:Router,
        private route:ActivatedRoute
       ){

    }
    ngOnInit():void{
        this.route.params.subscribe(params=>{
            this.typeID=+params['id'];
            this.loadData();
        })
    }

    loadData(){
        this.dtOptions ={
          pagingType: 'full_numbers',
          lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
          pageLength: 10,
          serverSide: true,
          processing: true,
          //dom: 'Bfrtip',
          ajax: (dataTablesParameters: any, callback) => {
            
                this.call.postRequest("/Notifications/All?notify_type_id="+this.typeID ,dataTablesParameters,
                        next=>{
                            next.data.forEach(item => {
                                const screen=(<string>item.link).split('/')[0];
                                const id=(<string>item.link).split('/')[1];
                      
                                if(screen.toLowerCase()=="item"){
                                  item.link="/product/details/"+id;
                                }
                              });
                            this.data= next.data;
                            callback({
                                recordsTotal: next.recordsTotal,
                                recordsFiltered: next.recordsFiltered,
                                data: []//next.data
                            });
                    });  
          
          },
          columns: [ 
            { data: 'id',title:'All Notifications'},
           
          ]
        }

        
        if(this.dtInstance.dtInstance) {
            this.dtInstance.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.ajax.reload();
            });
          }
    }
}
