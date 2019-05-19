import { DecimalPipe } from '@angular/common';
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
    
    roots:any[];
    parents:any[];
    req_categories:any[];
    root_id:number;
    parent_id:number;
    data:any={};
    waitingTime: any;
    allow:boolean=true;
    lastDate: any;
    loaded:boolean=false;


    newArrivals:any[];
    start:number=0;
    length:number=2;

    constructor(private pageTitleService: Title, 
                private route: Router, 
                public shared: SharedService,
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

        this.seo.metaTag('og:image',this.shared.appUrl()+'/assets/images/logo.png');
        this.seo.metaTag('og:url',window.location.href);
        this.seo.metaTag('og:locale',this.translate.currentLang);


        this.req_loadRoots();
        if(this.shared.isLogin()) {
            this.req_loadWaitingTime();
        }else{
         this.loaded=true;
        }
       
      this.loadCategories();
    //   console.log(addthis);
    this.loadNewArrivals();
         
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

      req_loadWaitingTime(){
        this.call.postRequest("/Requests/LastDate","",
            next=>{
                this.lastDate=next;
                this.loaded=true;
                if(next.data=="0001-01-01T00:00:00"){
                    this.allow=true;
                    this.shared.setLeadSent("0");
                }
                else{
                    this.allow=false;
                    this.req_calcWaitingTime();
                }
                //this.waitingTime=next.data;
                
            },
            error=>{
                this.loaded=true;
            }
        );
    }
    req_calcWaitingTime(){
        var d=new Date();
        //console.log(d,this.lastDate);
        //console.log(new Date(new Date(this.lastDate).getTime() +(24*60*60000)));

        var total=this.shared.dateDiff("s",new Date(new Date(this.lastDate).getTime() +(24*60*60000)),d.toString());
        //total+=24*60*60;
      //console.log(total);
      //var h=Math.floor((total % (60 * 60))
        var v=total / (60 * 60);
        var h=Math.floor(v);
        v=(v-h)*60;
        var m=Math.floor(v);
        v=(v-m)*60;
        var s=Math.floor(v);
         var format:DecimalPipe=new DecimalPipe("en");
        this.waitingTime=  format.transform(h,'2.0') + " : " + format.transform(m,'2.0') +" : " + format.transform(s,'2.0') ;
        if(total<=0){
            this.allow=true;
            this.shared.setLeadSent("0");
            return;
        }
        setTimeout(()=>{
            this. req_calcWaitingTime();
        },1000);
    }
    req_loadRoots(){
        this.call.postRequest("/RequestCategory/All?parent_id="+0,{length:1000},
        next=>{
            this.roots=next.data;
        }
        );
    }
    req_loadParents(parent_id:number){
        this.call.postRequest("/RequestCategory/All?parent_id="+parent_id,{length:1000},
        next=>{
            this.parents=next.data;
        }
        );
    }
    req_loadCategories(parent_id:number){
        this.call.postRequest("/RequestCategory/All?parent_id="+parent_id,{length:1000},
        next=>{
            this.req_categories=next.data;
        }
        );
    }

    req_sendRequest()
    {
        if(!this.shared.isLogin()){
            //this.shared.clearToken();
            this.route.navigate([{outlets:{modal:['login']}}]);
            return;
        } 
            this.call.postRequest("/Requests/Add" , this.data,
            response=>{
                this.shared.success("Save success");
                this.data={};
                this. req_loadWaitingTime();
                this.shared.setLeadSent("1");
            },
            error=>{
                //this.shared.error(error);
            });
        
    }

    loadNewArrivals(){
        this.call.postRequest("/item/all",{length:10},
        next=>{
            this.newArrivals=next.data
            // for (let index = 0; index < next.data.length; index++) {
            //     //this.newArrivals[index]=next.data[index];  
                
            // }
            this.ngzone.runOutsideAngular(()=>{
    
                this.newArrivaljQueryLoad(); 
            })
        });
    }
    next(){
        if((this.start+this.length)>=10) return;
            this.start+=this.length;
    }
    back(){
       if(this.start<this.length) return;
            this.start-=this.length;
            
    }
    
    newArrivaljQueryLoad(){
        var $this=this;
        $(function(){
            var res={};
    
         
            if(!$this.allow){
                res={
                    0:{
                        items:1
                    },
                    1000:{
                        items:2
                    },
                    1200:{
                        items:4
                    }
                }
            } else{
                res={
                    0:{
                        items:1
                    },
                    1000:{
                        items:2
                    }
                }
            }
          var slider= $("#newarrival_slider .owl-carousel").owlCarousel(
            {
                loop:true,
                margin:10,
                nav:false,        
                dots: true,
                autoplay:true,
                responsiveClass:true,
                dotsContainer: '#carousel-custom-dots',
                responsive:res
            }
        );
        $("#newarrival_slider .owl-next").click(function(){slider.trigger('next.owl');});
        $("#newarrival_slider .owl-prev").click(function(){slider.trigger('prev.owl');});
      
        })
        
      }
}
