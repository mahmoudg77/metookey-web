import {  Router } from '@angular/router';
import { CallapiService } from './../services/callapi.service';
import { SharedService } from './../services/shared.service';
import { Component, OnInit } from '@angular/core';
import { GlobalData } from '../services/global-data';

@Component({
    moduleId: module.id,
    selector: 'search-form',
    templateUrl: 'search-form.component.html',
    styleUrls: ['search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
    ngOnInit(): void {
        this.rundomID= Math.floor(Math.random() * 10000);
     }
    categories:any[]=[];
    products:any[]=[];
    q:string="";
    cat:string="All";
    public global=GlobalData;
    rundomID:number;
    constructor(private shared:SharedService,
                private call:CallapiService,
                private route:Router,){
                    
                    //this.loadProducts();   
 
    }

    autoCompete(){
        this.call.postRequest("/Item/AutoCompete?name="+this.q,"",next=>{this.products=next});
    }
    onSubmit(){
        this.route.navigateByUrl('/')
        .then(()=>{
            if(this.cat==""){
                this.route.navigateByUrl('/search/'+this.q)
            }else if(this.q==""){
                this.route.navigateByUrl('/cat/'+this.cat)
            }else{
                this.route.navigateByUrl('/cat-search/'+this.cat+ '/' +this.q)
            }
        });
    }

    searchBySelected(){
       this.products.forEach(itm=>{
           if(itm===this.q){
            this.onSubmit();
            return;
           }
       })
    }
    catSelected(catname){
        this.cat=catname;
        $('#cat-menu').css({'visibility': 'hidden'});
        $('#cat-menu').css({'opacity': '0'});
    }
    openMenu(){
        $('#cat-menu').css({'visibility': 'visible'});
        $('#cat-menu').css({'opacity': '1'});
    }
}
