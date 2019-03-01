import { trans } from './../../core/models/trans';
import { CallapiService } from './../../services/callapi.service';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from './../../services/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core';
 
@Component({
    moduleId: module.id,
    selector: 'city-edit',
    templateUrl: 'city-edit.component.html',
    styleUrls: ['city-edit.component.scss']
})
export class CityEditComponent implements OnInit {
    
   currentItem:any={name:[]};
    id: number;
    countries: any=[];
    clang: string="";


   constructor(private pageTitleService: Title, 
    private route: Router, 
    private shared: SharedService,
    public translate: TranslateService,
    private call:CallapiService,
    private currentRoute:ActivatedRoute){
    translate.getLangs().forEach(item=>{
        this.currentItem.name.push(new trans(item,''));
    }) 
    this.clang=this.translate.currentLang;
    }

    ngOnInit(): void {
        this.pageTitleService.setTitle('Edit City');
        this.currentRoute.params.subscribe(params=>{
            this.id = +params['id'];
            this.loadCountries();
            this.loadItem();
        });
    }

    loadItem(){
        let langs=this.translate.getLangs();
        if(this.id==0){
            langs.forEach(lang=>{
                let found=this.currentItem.name.filter(item => item.lang === lang);
                if(found.length==0)
                this.currentItem.name.push(new trans(lang,''));
            }); 
        }
        this.call.postRequest("/City/ItemForEdit/"+this.id,"",
        next=>{
            this.currentItem=next;
            
            langs.forEach(lang=>{
                let found=this.currentItem.name.filter(item => item.lang === lang);
                if(found.length==0)
                this.currentItem.name.push(new trans(lang,'New Lang'));
            }); 

            this.currentItem.name.forEach(item=>{
                let found=langs.filter(lang => item.lang === lang);
                if(found.length==0)
                this.currentItem.name.splice(this.currentItem.name.indexOf(item),1);
            }); 
        })
    }

    modalClose( $event=null ) {
         if($event){
            this.saveItem();
        }
    }

    saveItem(){
        let api="";
        if(this.currentItem.id>0){
             api="/City/Edit";
             
        }else{
            api="/City/Add";
        }
        this.call.postRequest(api,this.currentItem,
        next=>{
            this.shared.success("Save Success");
            this.shared.closeModal();
        },    
        error=>{
            this.shared.error(error);
        });
    }
    loadCountries() {
        this.call.postRequest("/Country/All",{"length":1000},
        next=>{
            this.countries=next.data;
        });
            
     }

}
