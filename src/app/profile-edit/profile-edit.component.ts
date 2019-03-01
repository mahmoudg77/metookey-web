import { CatSelectComponent } from './../cats-select/cat-select.component';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { CallapiService, imageData } from '../services/callapi.service';
import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { fadeInAnimation } from '../core/route-animation/route.animation';
import { Title } from '@angular/platform-browser';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import { environment } from 'environments/environment';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GlobalData } from 'app/services/global-data';

@Component({
    moduleId: module.id,
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [fadeInAnimation]
})
export class ProfileEditComponent implements OnInit{
    id:number;
    CurrentAccount: profile=new profile();
    selectedImage=null;
    public imageUrl=environment.mediaServer;
    countries = [] ;
    cities = [];
    Gender_ids = [];
    firstFormGroup: FormGroup;
    selectedCats:any[]=[];
    submitted:boolean=false;
    global=GlobalData;

    curr_mobile:string;
    @ViewChild('profileImage') profileImage:ElementRef
    mobile_vcode: string;
    step: number=1;
    constructor(
        private title: Title, 
        private call:CallapiService, 
        public shared: SharedService, 
        private _location: Location, 
        private _formBuilder: FormBuilder,
        private route: ActivatedRoute) {
        
    }

    ngOnInit() {
        this.title.setTitle("Edit Accounts");

        this.route.params.subscribe(params=>{
            this.id = +params['id'];
            this.loadCountries();
            this.getGenderIDS();
            this.getAccount();
        });

        this.firstFormGroup = this._formBuilder.group({
            Ctrl_first_name: ['', Validators.required],
            Ctrl_last_name: ['', Validators.required],
        });

        // this.myForm = this.fb.group({
        //     first_name: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
        //     last_name: [null, Validators.compose([Validators.required])],
        //     mobile: [null, Validators.compose([Validators.required])],
        //     // url: [null, Validators.compose([Validators.required, CustomValidators.url])],
        //     // date: [null, Validators.compose([Validators.required, CustomValidators.date])],
        //     // creditCard: [null, Validators.compose([Validators.required, CustomValidators.creditCard])],
        //     // phone: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
        //     // password: password,
        //     // confirmPassword: confirmPassword
        // });
    }

    backClicked() {
        this._location.back();
    }

    getAccount(){
        this.call.postRequest("/Account/ItemProfile", "",
            next=>{
                this.call.checkLogin();
                this.CurrentAccount = next;
                this.curr_mobile=this.CurrentAccount.mobile;
                this.call.postRequest("/Category/AccountCategories/"+this.CurrentAccount.id,"",
                next=>{
                    this.selectedCats=next;
                    this.loadCities(this.CurrentAccount.country_id);
                })
            },
            error=>{
                //console.log(error);
            },
            
        )
    }

    editAccount() {

        this.submitted = true;

        if (this.firstFormGroup.invalid) {
          return;
        }
        
        this.CurrentAccount.tbl_account_categories=this.selectedCats.map(a=>{return a.id});
        this.call.postRequest("/Account/EditProfile", this.CurrentAccount,
            next=>{
                
                if(this.selectedImage!=null){
                    var img=new imageData(this.selectedImage,'tbl_accounts',this.CurrentAccount.id,this.call);
                    img.upload(success=>{
                        
                        if( this.curr_mobile!=this.CurrentAccount.mobile){
                            this.step=2;
                            this.sendVerificationCode();
                            return;
                        }
                        this.getAccount();
                        this.shared.success("Save Success");
                    
                    },error=>{console.log(error);});
                    
                }else{
                    if( this.curr_mobile!=this.CurrentAccount.mobile){
                        this.step=2;
                        this.sendVerificationCode();
                        return;
                    }
                    this.shared.success("Save Success");
                }
                
                 
            },
            error=>{
            this.shared.error(error);
            }
            
        )
    }
    
    loadCountries() {
      this.call.postRequest("/Country/All",{"length":1000},
      next=>{
          this.countries=next.data;
      });
          
   }

   loadCities(country_id:number) {
    this.call.postRequest("/City/All",{length:1000,columns:[{data:'country_id',searchable:true}],search:{'regex':false,'Value':country_id.toString()}},
    next=>{
        this.cities=next.data;
    })

        
 }

    getGenderIDS(){
        this.call.postRequest("/Gender/All",{"length":3},
            next=>{
                this.Gender_ids=next.data;
            },
            error=>{
                //console.log(error);
            } 
       
        )
    }

    onFileSelected(event){
       
        if(this.shared.isImageFile(event.target.files[0]))
            this.selectedImage=event.target.files[0];
    
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
                
                this.profileImage.nativeElement.src=fileReader.result;
                
            };
            reader.readAsDataURL(event.target.files[0]);   
            
            
    }

    getSelectedCategory(){
        var t="";
        this.selectedCats.forEach(i=>{
            t+=(t==""?"":",")+i.name;
        });
        return t;
    }

    sendVerificationCode(){
            this.call.postRequest("/User/SendVerifyCode?Mobile="+this.CurrentAccount.mobile,"",
            next=>{
            });
        }    
    
    
    verifyMobile(){
        this.call.postRequest("/User/VerifyMobile?Mobile="+this.CurrentAccount.mobile+"&Code="+this.mobile_vcode,"",
        next=>{
            this.shared.success("Save Success image");
        });
    }

}

class profile{
    country_id?: number;
    city_id?: number;
    first_name: string;
    second_name: string;
    third_name: string;
    last_name: string;
    date_of_birth?: Date;
    mobile: string;
    gender_id?: number;
    id?: number;
    email: string;
    tbl_account_categories?: any[]=[];
    image:any;
    facebook?:string;
    twitter?:string;
    instagram?:string;
    google?:string;
  }