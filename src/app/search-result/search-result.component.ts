import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CallapiService } from './../services/callapi.service';
import { SharedService } from './../services/shared.service';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'ng5-breadcrumb';
import { Title } from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    selector: 'search-result',
    templateUrl: 'search-result.component.html',
    styleUrls: ['search-result.component.scss']
})
export class SearchResultComponent implements OnInit{
   
    public sliderResponse={"draw": 0,
            "recordsTotal": 0,
            "recordsFiltered": 0,
            "data":[],
            };
    sliderRequest={
        "draw": 0,
        "length": 8,
        "start": 0,
        "columns": [
                {
                    "data": "id",
                    "name": "id",
                    "orderable": true
                },
                {
                    "data": "rate_total_summary",
                    "name": "rate_total_summary",
                    "orderable": true
                },
                {
                    "data": "offer_price",
                    "name": "offer_price",
                    "orderable": true
                },
                {
                    "data": "name",
                    "name": "name",
                    "orderable": true,
                    "searchable":true
                },
                {
                    "data": "categories",
                    "name": "categories",
                    "orderable": true,
                    "searchable":true,
                    "search":null
                }, 
                {
                    "data": "tags",
                    "name": "tags",
                    "orderable": true,
                    "searchable":true,
                },
                
            ],
        'order':null,
        'search':{
                'regx':false,
                'value':''
                }
        };


    orders:any[]=[
        {'name':'Newest to Oldest Items','orders':[{'column':0,'dir':'desc'}]},
        {'name':'Oldest to Newest Items','orders':[{'column':0,'dir':'asc'}]},
        {'name':'Highest to Lowest Rate','orders':[{'column':1,'dir':'desc'}]},
        {'name':'Lowest to Highest Rate','orders':[{'column':1,'dir':'asc'}]},
        {'name':'Lowest to Highest Price','orders':[{'column':2,'dir':'asc'}]},
        {'name':'Highest to Lowest Price','orders':[{'column':2,'dir':'desc'}]},
        ];
    selectedSort:any={};
    q: string;
    cat: string;

    constructor(
        private shared :SharedService,
        private call:CallapiService,
        public translate:TranslateService,
        private router:Router,
        private route: ActivatedRoute,
        private breadcrumbService:BreadcrumbService,
        private title:Title
    ){
        this.selectedSort=this.orders[0];
        this.sliderRequest.order=this.selectedSort.orders;
        breadcrumbService.addFriendlyNameForRoute('/search/', 'Search');
        breadcrumbService.addFriendlyNameForRoute('/search/.*', 'Search');
        breadcrumbService.addFriendlyNameForRoute('/search/(.*)', 'Search');
        breadcrumbService.addFriendlyNameForRoute('/search/[a-zA-Z]+', 'Search');

    }

    ngOnInit(): void {
        this.route.params.subscribe(params=>{
            this.q = params['q'];
            this.cat=params['cat'];
            this.title.setTitle("Search Result: " + this.q);
          

            if(this.cat!='' && this.cat!=undefined && this.cat!=null && this.cat!= "All") 
                this.sliderRequest.columns.filter(i=>i.name=='categories')[0].search={'regx':false,'value':this.cat}
            
            if(this.q!=undefined)this.sliderRequest.search.value=this.q;
            this.loadItems();
        }); 
         
    }

    sort(order:any){
        this.selectedSort=order;
        this.sliderRequest.order=order.orders;
        this.sliderRequest.start=0;
        this.sliderRequest.draw=0;
        this.loadItems();
     }

     loadItems(){
        this.sliderResponse.data=[];
        //console.log(this.sliderResponse);
        this.call.postRequest("/Item/All",this.sliderRequest,
                items=>{
                        this.sliderResponse=items; 
                })     
    }

          
    

    loadMore(){
        this.sliderRequest.draw++;
        this.sliderRequest.start+=this.sliderRequest.length;
        
        this.call.postRequest("/Item/All",this.sliderRequest,
            items=>{
                items.data.forEach(itm=>{this.sliderResponse.data.push(itm)}); 
            }); 
    }
    
}
