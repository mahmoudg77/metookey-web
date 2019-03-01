import { Component, OnInit } from '@angular/core';

import { SharedService } from '../services/shared.service';
import { CallapiService } from '../services/callapi.service';
import { Title } from '@angular/platform-browser';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import { environment } from 'environments/environment';

@Component({
    moduleId: module.id,
    selector: 'profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements OnInit {

    id:number;
    CurrentProfile:any={};
    cats:any[]=[];
    env=environment;
    constructor( 
        private pageTitleService: Title,
        private call:CallapiService, 
        public shared: SharedService, 
        private _location: Location, 
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.pageTitleService.setTitle("View Profile");

        this.route.params.subscribe(params=>{
            this.id = +params['id'];
            this.getProfile();
        });
    }

    backClicked() {
        this._location.back();
    }

    getProfile(){
        this.call.postRequest("/Account/Item/"+this.id, "",
            next=>{
                if (this.id == null){
                    this.CurrentProfile = this.shared.getUser();
                }else{
                    this.CurrentProfile = next;
                }   
            },
            error=>{
                
            }
        )
    }
}
