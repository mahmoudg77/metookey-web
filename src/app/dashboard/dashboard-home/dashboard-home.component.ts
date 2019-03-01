import { SharedService } from './../../services/shared.service';
import { CallapiService } from 'app/services/callapi.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    selector: 'dashboard-home',
    templateUrl: 'dashboard-home.component.html',
    styleUrls: ['dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
    summary:any={};
    constructor(
        private title:Title,
        private call:CallapiService,
        private shared:SharedService,
        ){
            
        }
        
    ngOnInit(): void {
        this.title.setTitle("Dashboard");
        this.loadSummary();
    }

    loadSummary(){
        this.call.postRequest("/Dashboard/Summary","",
        next=>{
            this.summary=next;
        });
    }
}
