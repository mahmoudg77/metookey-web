import { trans } from './../../core/models/trans';
import { CallapiService } from './../../services/callapi.service';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from './../../services/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core';
 
@Component({
    moduleId: module.id,
    selector: 'country-edit',
    templateUrl: 'country-edit.component.html',
    styleUrls: ['country-edit.component.scss']
})
export class CountryEditComponent implements OnInit {
   currentItem:any={name:[]};
    id: number;
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
        this.pageTitleService.setTitle('Edit Country');
        this.currentRoute.params.subscribe(params=>{
            this.id = +params['id'];
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
        this.call.postRequest("/Country/ItemForEdit/"+this.id,"",
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
             api="/Country/Edit";
             
        }else{
            api="/Country/Add";
        }
        this.call.postRequest(api,this.currentItem,
        next=>{
            this.shared.success("Save Success");
            this.shared.closeModal();
        },
        error=>{
            this.shared.error(error);
        }
        );
    }


}
