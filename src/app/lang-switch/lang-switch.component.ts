import { CallapiService } from './../services/callapi.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { SharedService } from '../services/shared.service';
@Component({
    moduleId: module.id,
    selector: 'lang-switch',
    templateUrl: 'lang-switch.component.html',
    styleUrls: ['lang-switch.component.scss']
})
export class LangSwitchComponent  implements OnInit{
    lang: string;
    
    ngOnInit(): void {
        this.route.params.subscribe(params=>{
            this.lang = params['lang'];
            //this.hasAccess();
            this.changeLang(this.lang);
        });
    }
    constructor(private router: Router,private translate :TranslateService,
        private route:ActivatedRoute,public shared: SharedService, private _location: Location,
        private call:CallapiService){
        
    }
    changeLang(curr:string){
        this.translate.use(curr);
        this.call.loadCategories();

        //this.call.loadLocale();
        localStorage.setItem('lang',curr);
        // if(curr == "ar"){
        //     $("#layout").prop("href","assets/css/bootstrap-rtl.css");
        //   }else{
        //     $("#layout").prop("href","assets/css/bootstrap.min.css");
        //   } 
        this._location.back();
        $("#layout").prop("href",this.shared.getCssStyle());

    }
}
