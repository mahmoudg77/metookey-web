import { GlobalData } from './../../services/global-data';
import { CommentsComponent } from './../../comments/comments.component';
import { environment } from './../../../environments/environment';
import { CallapiService } from './../../services/callapi.service';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from './../../services/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Component, OnInit, AfterViewChecked, AfterViewInit, ViewChild, ElementRef, OnChanges, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { SEOServiceService } from 'app/services/seoservice.service';
import { ItemChartComponent } from 'app/item-chart/item-chart.component';

declare var $:any;
@Component({
    moduleId: module.id,
    selector: 'product-details',
    templateUrl: 'details.component.html',
    styleUrls: ['details.component.scss']
})
export class ProductDetailsComponent implements OnInit,OnChanges{
    CurrentProfile: any={};
   
    @ViewChild(CommentsComponent) comment: CommentsComponent;
    @ViewChild(ItemChartComponent) chart: ItemChartComponent;
    @ViewChild('carousel') prodCarousel : ElementRef;

    currentItem:any={parent_comment_od:null};
    id: number;
    //dtOptions: DataTables.Settings = {};
    permission:any={};
    itemImages: any[]=[
                   { 'thumb':'','large':'','meduim':''},
                    {'thumb':'','large':'','meduim':''},
                    {'thumb':'','large':'','meduim':''},
                    {'thumb':'','large':'','meduim':''},
                    {'thumb':'','large':'','meduim':''}
                ];
    env=environment;
    accItems:any=[];

    MyInteractions:any={
                        liked:false,
                        interested:false,
                        rate:null,
                        orders:[],
                        };
    private sliderDefaultOptions = {
        loop: true,
        margin: 0,
        responsiveClass: true,
        nav: false,
        navText: ['<i class="icon-left-open-big">', '<i class="icon-right-open-big">'],
        dots: true,
        autoplay: true,
        autoplayTimeout: 15000,
        items: 1,
    };
    qty: number=1;
    related:any[]=[];
    ogImage: any={ 'thumb':'','large':'','meduim':''};
    daysLeft: number;
    loading:boolean=true;
    loaderror: any;
    constructor(private title: Title, 
        private route: Router, 
        public shared: SharedService,
        public translate: TranslateService,
        private call:CallapiService,
        private currentRoute:ActivatedRoute,
        private ngZone: NgZone,
        private seo:SEOServiceService) {
           
         }
      
    ngOnChanges(){
        //this.ngOnInit(); 
        //console.log("Here");
    }
    calculateLeftDays(){
        const d=new Date();
        if(d>this.currentItem.date_end) {
            this.daysLeft= 0;
            return;
        }
       var days= this.shared.dateDiff('d',this.currentItem.date_end,d)
        if(days<0) 
        {
            this.daysLeft=0;
            return;
        }
        this.daysLeft=days;
    }
    ngOnInit(): void {
         
       
        this.currentRoute.params.subscribe(params=>{
            this.id = +params['id'];

            this.comment.itemid=this.id;
            //this.hasAccess();
            this.loadItem();
            // this.loadRelated();
            //this.loadItemImages();

            if(this.shared.isLogin()){
                this.loadMyInteractions();
            }
           
        });
       
        window.scrollTo(0, 0)    
        this.shared.showAddThis(); 
    }
    hasAccess(){
        this.call.postRequest("/User/HasAccess", [
            {'Screen':'Item', 'Method':'Add'},
            {'Screen':'Item', 'Method':'Edit'},
            {'Screen':'Item', 'Method':'Delete'},
            {'Screen':'Item', 'Method':'All'},
            {'Screen':'Item', 'Method':'Item'},
            ],
            next=>{
                this.permission=next;
            })
    }

    loadItem(){
        this.loading=true;
        this.call.postRequest("/Item/Item/"+this.id,"",
        next=>{
            this.currentItem=next;
            // this.chart.start=this.currentItem.date_start;
            // this.chart.end=this.currentItem.date_end;
            // this.chart.quantity=this.currentItem.quantity;
            // this.chart.orders=this.currentItem.orders_count;
            this.chart.load(this.currentItem.date_start,this.currentItem.date_end,this.currentItem.quantity,this.currentItem.orders_count,this.currentItem.original_price,this.currentItem.offer_price)
            this.calculateLeftDays();
            this.title.setTitle(this.currentItem.name);
            // this.getProfile();
            this.loadAccountProducts();
            this.loadRelated();
            this.loadItemImages();
            this.loading=false;
        },
        error=>{
            console.error(error);
            this.loaderror=error;
            this.loading=false;
        })
    }
    loadRelated(){
        this.call.postRequest("/Item/Related/"+this.id,"",
         next=>{
            this.related=next;
            // this.getProfile();
        })
    }
    loadMyInteractions(){

        this.call.postRequest("/Item/MyInteractions/"+this.id,"",
            next=>{
                this.MyInteractions=next;
            })
        }
    loadItemImages(){
        // this.itemImages=[];
        this.call.postRequest("/Image/Items?tag=main&model=tbl_item_card&model_id="+this.id,{'length':5},
        next=>{
            // next.forEach(i=>{
            //     this.itemImages.push(i); 
            // });
            this.itemImages[0]=next[0]||{'thumb':'','large':'','meduim':''};
            this.itemImages[1]=next[1]||{'thumb':'','large':'','meduim':''};
            this.itemImages[2]=next[2]||{'thumb':'','large':'','meduim':''};
            this.itemImages[3]=next[3]||{'thumb':'','large':'','meduim':''};
            this.itemImages[4]=next[4]||{'thumb':'','large':'','meduim':''};
            //this.ngZone.onMicrotaskEmpty.subscribe(()=>{
                this.carousel();
                this.loadMetaTags();
            //});
            
        });
        this.loadOgImage();

        
    }
    loadOgImage(){
        // this.itemImages=[];
        this.call.postRequest("/Image/Item?tag=ogImage&model=tbl_item_card&model_id="+this.id,'',
        next=>{
                this.ogImage=next;
        })
    }
    carousel(){
        var _this=this;
        //$('.product-single-carousel').css({'display':'none'})
        $('.product-single-default .product-single-carousel').owlCarousel(
         $.extend(true, {}, this.sliderDefaultOptions, {
            nav: true,
            navText: ['', ''],
            dotsContainer: '#carousel-custom-dots',
            autoplay: false,
            slideCount:5,
        }));
        $('#carousel-custom-dots .owl-dot').click(function () {
            $('.product-single-carousel').trigger('to.owl.carousel', [$(this).index(), 300]);
        });

        var links = [];


        var $productSliderImages = $('.product-single-carousel .owl-item:not(.cloned) img').length === 0 ? $('.product-single-gallery img') : $('.product-single-carousel .owl-item:not(.cloned) img');
        // $productSliderImages.each(function() {
        //     links.push({'src': $(this).attr('data-zoom-image')});
        // });
        _this.itemImages.forEach(element => {
            links.push({'src':_this.env.mediaServer+ element.large});
        });
        $(".prod-full-screen").click(function(e) {
            var currentIndex;
            if(e.currentTarget.closest(".product-slider-container")) {
                currentIndex = ($('.product-single-carousel').data('owl.carousel').current() + $productSliderImages.length - Math.ceil($productSliderImages.length / 2)) % $productSliderImages.length;
            }
            else {
                currentIndex = $(e.currentTarget).closest(".product-item").index();
            }
            //console.log(links);
            $.magnificPopup.open({
                items: links,
                navigateByImgClick: true,
                type: 'image',
                gallery: {
                    enabled: true
                },
            }, currentIndex);
        });
       
    }
   
    like(){
        this.call.postRequest("/Item/Like/"+this.currentItem.id, "",
            next=>{
                this.MyInteractions.liked=next;
            }
        )
    }
    reminder(){
        this.call.postRequest("/Item/Reminder/"+this.currentItem.id, "",
            next=>{
                 this.MyInteractions.interested=next;
            }
        )
    }
    loadAccountProducts(){
         this.call.postRequest("/Item/AccProducts/"+this.currentItem.created_by,"",
            next=>{
                this.accItems=next;
            }
        )
    }
    createNewOrder(){
       
         
        if(this.qty==0 ||  this.qty>this.remainQuantity()){
            this.shared.error("Invalid quantity, You must enter from 1 to " + this.remainQuantity());
            return;
        }
        if(!this.shared.isLogin()){
            this.route.navigate(["/",{outlets:{modal:["login"]}}],{queryParams: {item_id:this.id,qty:this.qty} });
            return;
        }
        //this.shared.transite={item_id:this.id,qty:this.qty};
        //this.route.navigateByUrl("/orders/new?item_id="+this.id+"&qty="+this.qty);
        this.route.navigate(["/",{outlets:{modal:["create-order"]}}],{queryParams: {item_id:this.id,qty:this.qty} });
    }
     
    remainQuantity():number{
        return this.currentItem.quantity - (this.currentItem.orders_count||0);
    }

    loadMetaTags(){
        
        this.ngZone.runOutsideAngular(()=>{
            this.shared.translate('site_title').subscribe(v=>{

                this.seo.titleTag(v +" : "+ this.currentItem.name);
            })
            this.seo.metaTag('keywords',this.currentItem.tags);
            this.seo.metaTag('description',this.currentItem.description);
            this.seo.metaTag('og:image',this.shared.appUrl()+this.env.mediaServer+ this.ogImage.large);
            this.seo.metaTag('og:url',window.location.href);
            this.seo.metaTag('og:description',this.currentItem.description);
        })
       
    }
}
