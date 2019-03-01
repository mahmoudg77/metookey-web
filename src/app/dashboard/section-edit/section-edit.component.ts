import { trans } from './../../core/models/trans';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SharedService } from 'app/services/shared.service';
import { TranslateService } from '@ngx-translate/core';
import { CallapiService } from 'app/services/callapi.service';

@Component({
    moduleId: module.id,
    selector: 'section-edit',
    templateUrl: 'section-edit.component.html',
    styleUrls: ['section-edit.component.scss']
})
export class SectionEditComponent {
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
        //this.pageTitleService.setTitle('Edit Product Type');
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
        this.call.postRequest("/Section/ItemForEdit/"+this.id,"",
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
             api="/Section/Edit";
             
        }else{
            api="/Section/Add";
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


}
