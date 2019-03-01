import { LoginoneComponent } from './../session/loginone/loginone.component';
import { ActivatedRoute } from '@angular/router';
import { MyToasterService } from 'app/services/my-toaster.service';
import { GlobalData } from './../services/global-data';
import { CallapiService } from './../services/callapi.service';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Component, OnInit, OnChanges, AfterViewInit, NgZone } from '@angular/core';
import { SELECT_VALUE_ACCESSOR } from '@angular/forms/src/directives/select_control_value_accessor';
import { TranslateService } from '@ngx-translate/core';
import { SEOServiceService } from 'app/services/seoservice.service';
import { GeneralModalService } from 'app/services/general-modal.service';
import { RegisterComponent } from 'app/session/register/register.component';
//require("assets/js/fb-sdk.js");
// declare var FB:any;
 declare var $:any;
@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit{
    
    textRequest:String;
    Response:any;
    searchCatLimit:number=6;
    searchCatOffset:number=0;
    email:string="";
    // value:string="Mahmoud"
    // netedvalue:string=eval("My Name is : {{value}}")
    // cat_ids:number[];
    public global=GlobalData;//.settings
    categories: any[];
    
    constructor(private pageTitleService: Title, 
                private route: Router, 
                private shared: SharedService,
                private call:CallapiService,
                private translate:TranslateService,
                private seo:SEOServiceService,
                private router:ActivatedRoute,
                private modal:GeneralModalService,
                private ngzone:NgZone
                ) {
      //  this.loadCategorySections();
      
    }
  
    ngOnInit() {

      this.pageTitleService.setTitle("Home");
        
      this.shared.translate('site_desc').subscribe(value=>{
          this.seo.metaTag('description',value);
          this.seo.metaTag('og:description',value);
        });
        this.shared.translate('site_keywords').subscribe(value=>{
            this.seo.metaTag('keywords',value);
        });
        this.shared.translate('site_title').subscribe(value=>{
            this.seo.titleTag(value);
            this.seo.metaTag('og:title',value);
        });
        this.seo.metaTag('fb:app_id',GlobalData.settings.facebook_appid);

        this.seo.metaTag('og:image',this.shared.appUrl()+'/assets/images/logo.png');
        this.seo.metaTag('og:url',window.location.href);
        this.seo.metaTag('og:locale',this.translate.currentLang);

       
      this.loadCategories();
    //   console.log(addthis);
         
    }
    
    loadCategories(){
        this.call.postRequest("/Category/All",{"length":100},next=>{
            this.categories=next.data
            this.jQueryLoad()

        });
      }

    // loadCategorySections(){
    //         this.cat_ids=this.global.settings.cat_in_home.split(',');
    // }

    searchCatNext(){
        if(this.searchCatOffset+this.searchCatLimit>=this.global.categories.length) return;
        this.searchCatOffset+=this.searchCatLimit;

    }
    searchCatBack(){

        if(this.searchCatOffset-this.searchCatLimit<=0) {
            this.searchCatOffset=0;    
        }else{
             this.searchCatOffset-=this.searchCatLimit;
        }

       
    }
    
    

      sendRequest(){
        this.call.postRequest("/Subscription/Add?email="+this.email,null,next=>{
            if(next){
                this.shared.success("Your email submitted, Thank you :)");
            }
        },
        error=>{
            this.shared.error(error);
            
        }
        )
      }

      jQueryLoad(){
        $(function(){
          var slider= $(".category-select .owl-carousel").owlCarousel(
            {
                loop:false,
                margin:10,
                nav:true,        
                dots: false,
                autoplay:false,
                responsiveClass:false,
                autoWidth:false,
                responsive:{
                    0:{
                        items:1
                    },
                    400:{
                        items:2
                    },
                    600:{
                        items:3
                    },
                    800:{
                        items:4
                    },
                    1000:{
                        items:6
                    }
                }
            }
        );
        // $("#slider_cats .owl-next").click(function(){slider.trigger('next.owl');});
        // $("#slider_cats .owl-prev").click(function(){slider.trigger('prev.owl');});
      
        })
        
      }
}
