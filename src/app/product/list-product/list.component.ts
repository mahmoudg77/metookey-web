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

declare var $:any;
@Component({
    moduleId: module.id,
    selector: 'list-product',
    templateUrl: 'list.component.html',
    styleUrls: ['list.component.scss']
})
export class ListProductComponent implements OnInit,OnDestroy{
    status: string;
    ngOnDestroy(): void {
        // $("body").off("click",".delete-item");
        // $("body").off("click",".edit-item");
        // $("body").off("click",".redirect");
        // $("body").off("click",".approve-item");
        // $("body").off("click",".reject-item");
        // $("body").off("click",".reset-item");
    }

    data:any[]=[];
    dtOptions: any = {};
    permission:any={};

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
        this.router.url.subscribe(url=>{
            this.status=url[0].path;
            this.hasAccess();
            this.loadData();
            
            var title="All Products";
            if(this.status=="my-products"){
               title ="My Products";
            }else  if(this.status=="my-favorite"){
                title ="My Favorite";
            }
            this.pageTitleService.setTitle(title);
        });
        
    }

    hasAccess(){
        this.call.postRequest("/User/HasAccess", [
                    {'Screen':'Item', 'Method':'Add'},
                    {'Screen':'Item', 'Method':'Edit'},
                    {'Screen':'Item', 'Method':'Delete'},
                    {'Screen':'Item', 'Method':'Approved'},
                    {'Screen':'Item', 'Method':'Reject'},
                    {'Screen':'Item', 'Method':'Reset'},
                    {'Screen':'Item', 'Method':'Featured'},
                    {'Screen':'Item', 'Method':'RemoveFeatured'}
                ],
            next=>{
                this.permission=next;
                 
            }
        )
    
    }

    // modalClose( $event=null ) {
    //     console.log($event); // { submitted: true }
    // }
    
    loadData(){
        var _this=this;
        this.dtOptions ={
          pagingType: 'full_numbers',
          lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
          pageLength: 10,
          serverSide: true,
          processing: true,
          dom: 'Bfrtip',
          buttons: [
                    'pageLength',
                    // 'colvis',
                    // 'copy',
                    // 'print',
                    // 'excel',
                    {
                        text:'Export xls',
                        action:function(){
                            _this.excel.exportAsExcelFile(_this.data, 'Products');
                        }
                    },
                    {
                        text:'Export csv',
                        action:function(){

                            new Angular5Csv(_this.data, 'Products',{headers:Object.keys(_this.data[0])});
                        }
                    }
                    ],
          ajax: (dataTablesParameters: any, callback) => {
                var api="/Item/";
                if(this.status=="my-products"){
                    api+="MyProducts";
                }else  if(this.status=="my-favorite"){
                    api+="MyFavorite";
                }else{
                    api+="All?status=2";
                }
              this.call.postRequest(api ,dataTablesParameters,
                  next=>{
                       
                      this.data=next.data;
                      //console.log(next);
                      callback({
                          recordsTotal: next.recordsTotal,
                          recordsFiltered: next.recordsFiltered,
                          data: []//next.data
                      });
    
              }
          )
          },
          columns: [ 
            {  data: 'is_featured', title:"Featured"},
            { data: 'id',title:"No.#"},
            { data: 'name',title:"Name",
                // render:(data,type,full,meta)=>{
                //     return '<a href="/product/details/'+full.id+'" class="redirect" >'+data+'</a>';
                // }
            }, 
            { data: 'categories',title:"Caegories"},
            { data: 'original_price',title:"Price"},
            { data: 'offer_price',title:"Offer Price"},
            { data: 'quantity',title:"Quantity" },
            { data: 'date_start',title:"Start Date",
                // render:(data,type,full,meta)=>{
                //     return this.datePipe.transform(data,"dd MMM yyyy");
                // }
            },
            { data: 'date_end',title:"End Date" ,
                // render:(data,type,full,meta)=>{
                //     return this.datePipe.transform(data,"dd MMM yyyy");
                // }
            },
            { data: 'orders_count',title:"Orders" },
            { data: 'acc_name',title:"Metookeyr Name",
                // render:(data,type,full,meta)=>{
                //     return '<a href="/profile/'+full.created_by+'" class="redirect" >'+data+'</a>';
                // }
            }, 
            // { title: 'Action',data:'id',orderable:false,searchable:false,
            // render:(data,type,full,meta)=>{
            //     //console.log(type,full,meta);
            //     var content='<ul class="list-inline action-icon">';
 
            //             content+='<li class="list-inline-item "> \
            //                         <a  href="javascript:;" class="text-success edit-item" title="Edit Item" data-id="'+data+'"> \
            //                             <i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i> \
            //                         </a> \
            //                     </li> ';
                    
            //             content+='<li class="list-inline-item "> \
            //                         <a href="javascript:;"  class="text-danger delete-item"  title="Delete Item"  data-id="'+data+'">\
            //                         <i class="fa fa-times fa-lg" aria-hidden="true"></i> \
            //                         </a>\
            //                     </li> ';

            //            if(full.is_approved==false || full.is_approved==null ) content+='<li class="list-inline-item "> \
            //                         <a href="javascript:;"  class="text-success approve-item "  title="Approve Item"  data-id="'+data+'">\
            //                         <i class="fa fa-check-circle fa-lg" aria-hidden="true"></i> \
            //                         </a>\
            //                     </li> ';
            //             if(full.is_approved==true || full.is_approved==null)  content+='<li class="list-inline-item "> \
            //                         <a href="javascript:;"  class="text-danger reject-item"  title="Reject Item"  data-id="'+data+'">\
            //                         <i class="fa fa-window-close  fa-lg" aria-hidden="true"></i> \
            //                         </a>\
            //                     </li> ';
                    
            //     content+='</ul>';
               
            //     return content;
            //     }
            // }
        ],
        }
      }
    
      deleteItem(item:any){
        if(this.permission.Item.Edit!=true) {
            this.shared.error("You haven't permission !!");
            return;
        }
        if(!confirm("Are you sure delete this Item?")) return;
        this.call.postRequest("/Item/Delete/" + item.id ,"",
            next=>{
                let index=this.data.indexOf(item);
                this.data.splice(index,1);   
            
            });
      }

    //   deleteItem(item:number){
    //     if(this.permission.Item.Edit!=true) {
    //         this.shared.error("You haven't permission !!");
    //         return;
    //     }
    //     if(!confirm("Are you sure delete this Item?")) return;
    //     this.call.postRequest("/Item/Delete/" + item ,"",
    //         next=>{
    //             let index=this.data.indexOf(this.data.filter(a=>a.id==item));
    //             this.data.splice(index,1);   
            
    //         });
    //   }
      approveItem(item:any){
        if(this.permission.Item.Approved!=true) {
            this.shared.error("You haven't permission !!");
            return;
        }
        this.call.postRequest("/Item/Approved/" + item.id ,"",
            next=>{
                    item.is_approved=true;
               
            });
      }
      rejectItem(item:any){
        if(this.permission.Item.Reject!=true) {
            this.shared.error("You haven't permission !!");
            return;
        }
        this.call.postRequest("/Item/Reject/" + item.id ,"",
            next=>{
                    item.is_approved=false;
            });
      }
      resetItem(item:any){
        if(this.permission.Item.Reset!=true) {
            this.shared.error("You haven't permission !!");
            return;
        }
        this.call.postRequest("/Item/reset/" + item.id ,"",
            next=>{
                    item.is_approved=null;
            });
      }
     
      featuredItem(item:any){
        if(this.permission.Item.Featured!=true) {
            this.shared.error("You haven't permission !!");
            return;
        }
        this.call.postRequest("/Item/Featured/" + item.id ,"",
            next=>{
                    item.is_featured=true;
            });
      }
      unFeaturedItem(item:any){
        if(this.permission.Item.RemoveFeatured!=true) {
            this.shared.error("You haven't permission !!");
            return;
        }
        this.call.postRequest("/Item/RemoveFeatured/" + item.id ,"",
            next=>{
                    item.is_featured=false;
            });
      }
}
 