import { SharedService } from '../../services/shared.service';
import { CallapiService } from '../../services/callapi.service';
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { fadeInAnimation } from '../../core/route-animation/route.animation';
import { Title } from '@angular/platform-browser';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'view',
    templateUrl: 'view.component.html',
    styleUrls: ['view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {"[@fadeInAnimation]": 'true'},
    animations: [fadeInAnimation]
})

export class ViewComponent implements OnInit{
    id:number;
    CurrentAccount:any;
    dtOptions: DataTables.Settings = {};
    constructor(
        private title: Title, 
        private call:CallapiService, 
        public shared: SharedService, 
        private _location: Location, 
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.title.setTitle("View Accounts");

        this.route.params.subscribe(params=>{
            this.id = +params['id'];
            this.getAccount();
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
            error=>{console.log(error);}
            
        )
    }
}
