import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { CallapiService } from '../../services/callapi.service';
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { fadeInAnimation } from '../../core/route-animation/route.animation';
import { Title } from '@angular/platform-browser';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'edit',
    templateUrl: 'edit.component.html',
    styleUrls: ['edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [fadeInAnimation]
})
export class EditComponent implements OnInit{
    id:number;
    CurrentAccount: any;
    Accounts = [];
    CurrentAccountObj: object={};
    govs = [] ;
    companyType_ids = [];
    constructor(
        private title: Title, 
        private call:CallapiService, 
        public shared: SharedService, 
        private _location: Location, 
        private route: ActivatedRoute) {
        
    }

    ngOnInit() {
    this.title.setTitle("Edit Accounts");

    this.route.params.subscribe(params=>{
        this.id = +params['id'];
        this.getAccount();
        this.getGov();
        this.getCompanyTypeIDS();
    });
    }

    backClicked() {
        this._location.back();
    }

    getAccount(){
        this.call.postRequest("/Account/Item/"+this.id, "",
            next=>{
                
                this.CurrentAccount = next;
                
            },
            error=>{
            console.log(error);
            },
            
        )
    }

    editAccount(id: any) {
        this.call.postRequest("/Account/Edit/"+this.id, this.CurrentAccount,
            next=>{
                
                this.call.postRequest("/Account/Item/"+next.data.id, "",
                    next=>{
                         
                        this.CurrentAccount = next;
                         
                    },
                    error=>{console.log(error);},
                    
                )
                 
            },
            error=>{
            console.log(error);
            }
            
        )
    }

    getGov(){
        this.call.postRequest("/Gov/All","" ,
            next=>{
               
                this.govs=next.data;
               
            },
            error=>{
            console.log(error);
            } 
        )
    }

    getCompanyTypeIDS(){
        this.call.postRequest("/CompanyType/All","",
            next=>{
                this.companyType_ids=next.data;
                //console.log(next);
            },
            error=>{
            console.log(error);
            } 
       
        )
    };

}
