import { CatSelectComponent } from './../../cats-select/cat-select.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GlobalData } from './../../services/global-data';
import { trans } from './../../core/models/trans';
import { CallapiService, imageData } from './../../services/callapi.service';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from './../../services/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { Observable } from 'rxjs/Observable';


@Component({
    moduleId: module.id,
    selector: 'edit-product',
    templateUrl: 'edit-product.component.html',
    styleUrls: ['edit-product.component.scss']
})
export class EditProductComponent {

    currentItem:Product=new Product();
    id: number;
    step:number=1;

    isLinear = false;

    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup:FormGroup;
    fourFormGroup:FormGroup;
    fiveFormGroup:FormGroup
    
    lookup={
        productTypes:[],
        languages:[],
        countries:[],
        cities:[],

    }
    
    global=GlobalData;

    // @ViewChild(CatSelectComponent) catSelector:CatSelectComponent;
    intervals=[
        {value:'d',name:'Dayes'},
        {value:'M',name:'Months'},
        {value:'y',name:'Years'},
    ]
    interval:string='d';
    intervalText:string='Dayes';
    shipping=1;
    images: any[]=[{},{},{},{},{}];
    paymentMethods:any=[
        {id:1,name:'Cash On Dilevered'},
        {id:2,name:'Visa/MasterCard'},
        {id:3,name:'PayPal'}
    ]
    selectedPMthods: string[]=[];
    selectedCats?: any[]=[];
    featuresArray?:string[]=[];
    
    agree:boolean=false;
    tags:string[];
    
    form: FormGroup;
    tagSuggestions = [];
    value:Observable<string>;
    ogImage: any;
    constructor(
        private pageTitleService: Title, 
        private route: Router, 
        public shared: SharedService,
        public translate: TranslateService,
        private call:CallapiService,
        private _formBuilder: FormBuilder,
        private currentRoute:ActivatedRoute,
        private formBuilder: FormBuilder
        ){
            //this.global=GlobalData;
            //this.interval=this.intervals[0];
        this.form = this.formBuilder.group({
            tags: []
        });
        
        console.log(this.step);
    }
    
    
    
    loadLookups(){
        this.lookup.languages=this.translate.getLangs();
        this.call.postRequest("/ItemType/All",{length:1000},
        next=>{
            this.lookup.productTypes=next.data;
        })
        this.call.postRequest("/Country/All",{length:1000},
        next=>{
            this.lookup.countries=next.data; 
            //console.log(this.lookup.countries[0].id);
            this.loadCities(this.lookup.countries[0].id) ;
        })
    }
    loadCities(country_id:number){
        this.call.postRequest("/City/All",{length:1000,columns:[{data:'country_id',searchable:true}],search:{'regex':false,'Value':country_id.toString()}},
        next=>{
            this.lookup.cities=next.data;
        })
    }
    ngOnInit(): void {
        this.pageTitleService.setTitle('Edit Product');
        this.loadLookups();
        this.currentItem=new Product();
        this.currentRoute.params.subscribe(params=>{
            this.id = +params['id'] | 0;
            if(this.id>0){
                this.loadItem();
            }else{
                this.currentItem=new Product();
                this.currentItem.created_by=this.shared.getUser().id;
                
            }
        });
        
        this.firstFormGroup = this._formBuilder.group({
            Ctrl_country_id: ['', Validators.required],
            Ctrl_city_id: ['', Validators.required],
            Ctrl_metokey_type_id: ['', Validators.required],
            Ctrl_name: ['', Validators.required],
            Ctrl_description: ['', Validators.required],
        });
        this.secondFormGroup = this._formBuilder.group({
            Ctrl_quantity: ['', Validators.required],
            Ctrl_offer_price: ['', Validators.required],
            Ctrl_original_price: ['', Validators.required],
            Ctrl_insurance_value: ['', Validators.required],
            // Ctrl_interval: ['', Validators.required],
            //Ctrl_dateDiff: [null, Validators.required],
            Ctrl_date_start: ['', Validators.required],
            Ctrl_date_end: ['', Validators.required],
            Ctrl_tax:[''],
            
        });
        this.thirdFormGroup = this._formBuilder.group({
            // Ctrl_addfeature: [''],
            // Ctrl_shipping_option: ['', Validators.required],
            // Ctrl_shipping_cost: ['', Validators.required],
            // Ctrl_agree:['',Validators.required]
        });
    }
    
    GoTOStep1(){this.step = 2;}  
    GoTOStep2(){this.step = 3;} 
    GoTOStep3(){this.step = 4;}  
    GoTOStep4(){this.step = 5;}
    GoTOStep5(){this.step = 6;}
    
    loadItem(){
        this.call.postRequest("/Item/item/"+this.id,"",
        next=>{
            this.currentItem=next;
            
            if((this.currentItem.tags||'')!='')
            this.form.controls['tags'].setValue((this.currentItem.tags||'').split(','));
            if((this.currentItem.payment_methods||'')!='')
            this.selectedPMthods=this.currentItem.payment_methods.split(',');
            
            this.shipping=this.currentItem.shipping_cost>0?1:0;
            // this.currentItem.selectedCats=this.currentItem.categories.split(',');
            this.call.postRequest("/Category/ProductCategories/"+this.id,"",
            next=>{
                this.selectedCats=next;
                this.currentItem.tbl_item_categories=[];
                next.forEach(itm=>{this.currentItem.tbl_item_categories.push({item_id:itm.item_id,category_id:itm.category_id})});
                this.featuresArray= this.currentItem.features.split('|');
                this.shipping=(this.currentItem.shipping_option!='')?1:0;
                //this.catSelector.selected=this.currentItem.selectedCats;
                // console.log(this.catSelector.selected);
            })
        })
    }
    
    customValidate(step:number){
        switch(step){
            case 1:
                return this.selectedCats.length>0;
            case 2:
               return this.currentItem.date_end>this.currentItem.date_start && this.currentItem.offer_price<this.currentItem.original_price;
               case 3:
               return this.featuresArray.length>0 
                        && (this.shipping==0 || (this.currentItem.shipping_option!="" && this.currentItem.shipping_cost>0) );  
            case 4:
            //console.log(this.images);
            return this.currentItem.id>0 || this.images.filter(a=> ! ('name' in a)).length==0;
            case 5:
            return this.selectedPMthods.length>0 &&   (this.form.controls['tags'].value||'').length>0 && this.agree;
        }
    }
    
    saveItem(){
        let api="";
        if(this.currentItem.id>0){
            api="/Item/Edit";
        }else{
            api="/Item/Add";
        }
        this.currentItem.features=this.featuresArray.join("|");
        this.currentItem.tbl_item_categories=[];
        this.currentItem.tags=this.form.controls['tags'].value.join(',');
        this.currentItem.payment_methods=this.selectedPMthods.join(',');
        this.selectedCats.forEach(itm=>{this.currentItem.tbl_item_categories.push({item_id:this.currentItem.id,category_id:itm.id})})
        //return;
        this.call.postRequest(api,this.currentItem,
            next=>{
                this.currentItem.id=next.id;
                if(this.images.filter(a=>'name' in a).length>0){
                    var uploaded=0;
                    var img=new imageData(this.ogImage,'tbl_item_card',next.id,this.call,'ogImage');
                    img.upload(
                        success=>{
                            this.images.forEach(itm => {
                                if('name' in itm) {
                                    var img=new imageData(itm,'tbl_item_card',next.id,this.call);
                                    img.upload(
                                        ok=>{
                                            uploaded++; 
                                            if(uploaded==this.images.length) {
                                                this.shared.success("Save Success");
                                                this.route.navigateByUrl("/product/my-products");
                                            }
                                        },
                                        err=>{
                                            uploaded++;
                                        });
                                    }else{
                                        uploaded++;
                                    }
                                });
                                
                                
                            },
                            error=>{
                                uploaded++;
                            });
                            
                            
                        }else{
                            this.shared.success("Save Success");
                        }
                    });
                }
                
                getSelectedCategory(){
                    var t="";
                    if(this.selectedCats==undefined) return t;
                    this.selectedCats.forEach(i=>{
                        t+=(t==""?"":",")+i.name;
                    });
                    return t;
                }
                
                
                onFileChange(event,index){
                    
                    if(!this.shared.isImageFile(event.target.files[0])){
                        
                        return;
                    }
                    
                    const reader = new FileReader();
                    let image = new Image();
                    reader.onload =  (e) =>{
                        //   this.imageDrop.nativeElement.innerHTML="";		        
                        let fileReader = e.target as FileReader;
                        image.src = fileReader.result.toString();
                        image.width = 150; 
                        
                        event.target.parentNode.style.backgroundImage='url('+fileReader.result+')';
                        
                    };
                    reader.readAsDataURL(event.target.files[0]);   
                    
                    this.images[index]=event.target.files[0];
                    
                    
            //  event.target.parentNode.style.backgroundImage='url('+event.target.files[0].result+')';
            //  console.log(event.target.parentNode);
            //  console.log(event.target);
            
        }
        onOGImageChange(event){
            
            if(!this.shared.isImageFile(event.target.files[0])){
                
                return;
            }
            
            const reader = new FileReader();
            let image = new Image();
            reader.onload =  (e) =>{
                //   this.imageDrop.nativeElement.innerHTML="";		        
                let fileReader = e.target as FileReader;
                image.src = fileReader.result.toString();
                image.width = 150; 
                
                event.target.parentNode.style.backgroundImage='url('+fileReader.result+')';
                
            };
            reader.readAsDataURL(event.target.files[0]);   
            
            this.ogImage=event.target.files[0];
        }
        
        
        readfiles(files){
                // console.log('files from readfiles -  ',files[0]);    
                const reader = new FileReader();
                let image = new Image();
                reader.onload =  (e) =>{
                    //   this.imageDrop.nativeElement.innerHTML="";		        
                    let fileReader = e.target as FileReader;
                    image.src = fileReader.result.toString();
                    image.width = 150; 
                    
                    //   this.imageDrop.nativeElement.appendChild(image);  
                    //   if (this.imageUpload.controls.imageInput.value==null) {
                        //     alert('ok');
                        //     //this.imageUpload.controls.imageInput.setValue(files[0]);  
                        //     console.log(this.imageUpload.controls)
                        //     let input = this.imageUpload.controls.imageInput as any;
                        //     input.files = files;                        
        //   }    
    };
    reader.readAsDataURL(files[0]);    
    
}//readfiles

toggleSelectPMethod(id:number){
    var index =this.selectedPMthods.indexOf(id.toString());
    if(index>-1){
        this.selectedPMthods.splice(index,1);
    }else{
        this.selectedPMthods.push(id.toString());
    }
}
}
class Product{
    id?: number=0;
    name:string;
    original_price:number;
    offer_price: number;
    quantity: number;
    date_start?: Date=new Date();
    date_end: Date;
    features: string;
    returns_exchanges:string;
    shipping_option: string;
    created_by: number;
    lang:string;
    country_id:number;
    city_id: number;
    metokey_type_id: number;
    created_at?: Date=new Date();
    insurance_value?: number;
    supplier_name?: string='';
    shipping_cost?: number=0;
    tax?: number=0;
    views?:number=0;
    categories?:string="";
    tbl_item_categories:any[]=[];
    description:string;
    tags:string;
    payment_methods:string;
    order_note?:string=''
}
