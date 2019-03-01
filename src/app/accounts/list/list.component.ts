import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { CallapiService } from '../../services/callapi.service';
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { fadeInAnimation } from '../../core/route-animation/route.animation';
import { Title } from '@angular/platform-browser';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'list',
    templateUrl: 'list.component.html',
    styleUrls: ['list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [fadeInAnimation]
})
export class ListComponent implements OnInit{
//Accounts: Account[];
Accounts: any[];
countries:any = {} ;
CurrentAccount: any = {};
permission:any ={};
dtOptions: DataTables.Settings = {};

constructor(private title: Title, private call:CallapiService, 
        public shared: SharedService, 
        private route: ActivatedRoute,
        public router:Router,
        ) 
    {
    this.hasAccess();
    this.getAccount();
    }




    ngOnInit()  :void{
        this.title.setTitle("Accounts List");
        
    }

    hasAccess(){
        this.call.postRequest("/User/HasAccess", [
            {'Screen':'Account', 'Method':'Approve'},
            {'Screen':'Account', 'Method':'Reject'},
            {'Screen':'Account', 'Method':'All'},
            {'Screen':'User', 'Method':'Edit'},
            ],
            next=>{
                this.permission=next;
            }
        )
    }

    getAccount(){
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            serverSide: true,
            processing: true,
            ajax: (dataTablesParameters: any, callback) => {
                this.call.postRequest("/Account/All" ,dataTablesParameters,
                    next=>{
                         
                        this.Accounts=next.data;
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
                        { data: 'city_name' },
                        { data: 'mobile' },
                        { data: 'email' },
                        { data: 'count_of_products' },
                        { data: 'count_of_categories' },
                        { name: 'Action',orderable:false,searchable:false }],
        }
        
    }


    approvedAccount(acc: any){
        this.call.postRequest("/Account/Approve/" + acc.id , "",
            next=>{
               
                if (next == true){
                    acc.approved = true;
                }
                
            }
        )
    }
    rejectAccount(acc: any){
        this.call.postRequest("/Account/Reject/" + acc.id , "",
            next=>{

                if (next == true){
                    acc.approved = false;
                }
             }
        )
    }
}
