import { CallapiService } from './../../services/callapi.service';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from './../../services/shared.service';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
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
    this.pageTitleService.setTitle('Categories');
    this.hasAccess();
    this.loadCategories();
  }
  hasAccess(){
    this.call.postRequest("/User/HasAccess", [
        {'Screen':'Category', 'Method':'Add'},
        {'Screen':'Category', 'Method':'Edit'},
        {'Screen':'Category', 'Method':'Delete'}
        ],
        next=>{
            this.permission=next;
        }
    )
}

// modalClose( $event=null ) {
//     console.log($event); // { submitted: true }
// }
  loadCategories(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
          this.call.postRequest("/Category/All" ,dataTablesParameters,
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

  editItem(item:any){

  }
  deleteItem(item:any){
    if(!confirm("Are you sure delete this category?")) return;
    this.call.postRequest("/Category/Delete/" + item.id ,"",
              next=>{
                    let index=this.data.indexOf(item);
                    this.data.splice(index,1);   
                
                });
  }

}
