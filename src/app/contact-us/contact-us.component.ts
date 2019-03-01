import { GlobalData } from 'app/services/global-data';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { SharedService } from 'app/services/shared.service';
import { Component, OnInit } from '@angular/core';
import { CallapiService } from 'app/services/callapi.service';
import { TranslateService } from '@ngx-translate/core';
import { SEOServiceService } from 'app/services/seoservice.service';

@Component({
    moduleId: module.id,
    selector: 'contact-us',
    templateUrl: 'contact-us.component.html',
    styleUrls: ['contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
    sections:any[];
    sectionName:string="";
    formData: any={};
    constructor(
        private title:Title,
        private call:CallapiService,
        public shared:SharedService,
        private meta :Meta,
        private route:Router,
        private translate:TranslateService,
        private seo:SEOServiceService
        ){
           
        }
        
    ngOnInit(): void {
        this.title.setTitle("Contact Us");
      
        this.getSections();
    }
    loadMetaTags(){
        this.shared.translate('site_desc').subscribe(value=>{
            this.seo.metaTag('description',value);
            this.seo.metaTag('og:description',value);
          });
          this.shared.translate('site_keywords').subscribe(value=>{
              this.seo.metaTag('keywords',value);
          });
          this.shared.translate('site_title').subscribe(value=>{
              this.seo.titleTag(value +':'+"Contact Us");
              this.seo.metaTag('og:title',value +':'+"Contact Us");
          });
          this.seo.metaTag('fb:app_id',GlobalData.settings.facebook_appid);
  
          this.seo.metaTag('og:image',this.shared.appUrl()+'/assets/images/logo.png');
          this.seo.metaTag('og:url',window.location.href);
          this.seo.metaTag('og:locale',this.translate.currentLang);
  
               
      }
        
    getSections(){
        this.call.postRequest("/Section/All",null,
        next=>{
                this.sections=next.data;
        }
        )
    }
    send(){
        this.call.postRequest("/ContactUs/Add",this.formData,
            next=>{
                    this.shared.success("Your message has been sent.");
                    this.formData={};
                    this.sectionName="";
            }
        )
    }
   
}
