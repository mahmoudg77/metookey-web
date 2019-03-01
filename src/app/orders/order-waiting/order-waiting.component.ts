import { ActivatedRoute } from '@angular/router';
import { CallapiService } from './../../services/callapi.service';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from './../../services/shared.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { ExcelService } from './../../services/excel.service';
import { environment } from 'environments/environment';

@Component({
    moduleId: module.id,
    selector: 'order-waiting',
    templateUrl: 'order-waiting.component.html',
    styleUrls: ['order-waiting.component.scss']
})
export class OrderWaitingComponent implements OnInit{
    data:any[]=[];
    dtOptions: any = {};
    permission:any={};
    status: any;
    nextStatus:string="";
    hasPermission=false;
    filter: string="";
    params: any={};
    scope: string="";
    constructor( 
        private pageTitleService: Title, 
        private route: Router, 
        private shared: SharedService,
        public translate: TranslateService,
        private call:CallapiService,
        private datePipe:DatePipe,
        private excel:ExcelService,
        private router:ActivatedRoute) {

    }

    ngOnInit() {
        this.pageTitleService.setTitle('Orders');
        
        this.hasAccess();
        this.router.url.subscribe(url=>{
            this.scope=url[0].path;
            if(url[1]!=undefined)
            this.status=url[1].path;
           // console.log(this.status);
            switch(this.status){
                case "cobone":
                    this.nextStatus="SetCoboned";
                    break;
                case "cash":
                    this.nextStatus="SetPayed";
                    break;
                case "receive":
                    this.nextStatus="SetReceived";
                    break;
            }
            this.loadData();
            //this.dtOptions.ajax.reloadData();
            //console.log(url);
        });
        this.router.queryParams.subscribe(parms=>{
            this.params=parms;
            var AllKeys=Object.keys(parms);
            AllKeys.forEach(key=>{
                this.filter+=(this.filter==""?"":"&")+key+'='+parms[key];
            })
        })
       
    }
    hasAccess(){
        this.call.postRequest("/User/HasAccess", 
                [
                    {'Screen':'Orders', 'Method':'SetCoboned'},
                    {'Screen':'Orders', 'Method':'SetUnCoboned'},
                    {'Screen':'Orders', 'Method':'SetPayed'},
                    {'Screen':'Orders', 'Method':'SetUnPayed'},
                    {'Screen':'Orders', 'Method':'SetReceived'},
                    {'Screen':'Orders', 'Method':'SetUnReceived'},
                    {'Screen':'Orders', 'Method':'SetNotReceived'},
                ],
            next=>{
                this.permission=next;
                this.hasPermission=this.permission.Orders[this.nextStatus];
            }
        )
    
    }

    loadData(){
        var _this=this;
        this.dtOptions ={
          pagingType: 'full_numbers',
          lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
          pageLength: 10,
          serverSide: true,
          processing: true,
          order:[[0,'desc']],
          dom: 'Bfrtip',
          //dom: '<"top"lf>rt<"bottom"ip><"clear">B',
          buttons: [
                    'pageLength',
                    // 'colvis',
                    // 'copy',
                    // 'print',
                    // 'excel',
                    {
                        text:'Export xls',
                        action:function(){
                            var data=[];
                            _this.data.forEach(item=>{
                                var itm={};
                                Object.keys(item).forEach(nItem=>{
                                    var col= _this.dtOptions.columns.filter(a=>a.data==nItem)[0];
                                    if(col !=null) {
                                        itm[col.title]=item[nItem];
                                    }
                                })
                                data.push(itm);
                            })
                            _this.excel.exportAsExcelFile(data, 'Products');
                        }
                    },
                    // {
                    //     text:'Export csv',
                    //     action:function(){

                    //         new Angular5Csv(_this.data, 'Products',{headers:Object.keys(_this.data[0])});
                    //     }
                    // }
                    ],
          ajax: (dataTablesParameters: any, callback) => {
              var api="/Orders/";
              if(this.scope=="home"){ //Dashboard home
                api+="All";
                if(this.filter!="") api+="?"+this.filter;
              }else if(this.scope=="waiting"){ //Dashboard orders
                api+="All?order_state="+this.status;
                if(this.filter!="") api+="&"+this.filter;
              }else{ //Any page
                api+="MyOrders?order_state="+this.status;
                if(this.filter!="") api+="&"+this.filter;
              }
              this.call.postRequest(api ,dataTablesParameters,
                next=>{
                    this.data= next.data;
                    callback({
                        recordsTotal: next.recordsTotal,
                        recordsFiltered: next.recordsFiltered,
                        data: []//next.data
                    });
                });  
          
          },
          columns: [ 
            { data: 'id',title:'No'},
            { data: 'item_id',title:'Metookey No'},
            { data: 'item_name',title:'Metookey Name'},
            { data: 'item_offer_price',title:'Price'},
            { data: 'quantity',title:'Quantity'},
            { data: 'insurance_value',title:'Deposit Value'},
            { data: 'created_at',title:'Order Date'},
            { data: 'order_state',title:'Status'},
          ]
        }

        //this.dtOptions.ajax([]);
    }

   changeState(itm:any,newStatus:string){
    this.call.postRequest("/Orders/"+newStatus+"/"+itm.id ,{},
        next=>{
            if(next){
                this.data.splice(this.data.indexOf(itm),1);
            }
        });  
   }

   statusClass(state:string){
    switch(state){
        case "cobone": return "primary";
        case "cash":return "secondary";
        case "receive":return "success";
        case "canceled" || "not-received" :return "danger";
        case "offer":return "info";
    }
   }
}
