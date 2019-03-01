import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SharedService } from 'app/services/shared.service';
import { TranslateService } from '@ngx-translate/core';
import { CallapiService } from 'app/services/callapi.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { trans } from 'app/core/models/trans';
 interface branch{
     data:any[];
     level?:number;
     selected?:any;
 }
@Component({
    moduleId: module.id,
    selector: 'request-category',
    templateUrl: 'request-category.component.html',
    styleUrls: ['request-category.component.scss']
})
export class RequestCategoryComponent implements OnInit {
    
    roots:branch={data:[],selected:null,level:0};
    parents:branch={data:[],selected:null,level:1};
    items:branch={data:[],selected:null,level:2};

    permission:any={};
    currentLevel:number=0;
    currentParentId:number=0;

    closeResult: string;
    currentItem:any={name:[]};

    cLang=this.translate.currentLang;
    @ViewChild('content') content:ElementRef;
    modelInstance: NgbModalRef;
    constructor(private pageTitleService: Title, 
        private route: Router, 
        private shared: SharedService,
        public translate: TranslateService,
        private call:CallapiService,
        private modalService: NgbModal, 
        ) {
            translate.getLangs().forEach(item=>{
                this.currentItem.name.push(new trans(item,''));
            }) 
         }

    ngOnInit() {
        this.pageTitleService.setTitle('Customer lead category');
        this.hasAccess();
        this.loadData();
        
    }
    
    hasAccess(){
        this.call.postRequest("/User/HasAccess", [
            {'Screen':'RequestCategory', 'Method':'Add'},
            {'Screen':'RequestCategory', 'Method':'Edit'},
            {'Screen':'RequestCategory', 'Method':'Delete'}
            ],
            next=>{
                this.permission=next;
            }
        )
    }
    
      loadData(){
              this.call.postRequest("/RequestCategory/All?parent_id="+this.currentParentId,{length:1000},
                  next=>{
                    if(this.currentLevel==0){
                        this.roots.data=next.data;
                        this.parents={data:[]};
                        this.items={data:[]};
                        this.roots.selected=null;    
                    }
                    if(this.currentLevel==1){
                        this.parents.data=next.data;
                        this.items={data:[]};
                        this.parents.selected=null;
                    }
                    if(this.currentLevel==2){
                        this.items.data=next.data;
                    }
              }
          );
          }
        
    loadChilds(level:number,parentid:number=0){
        this.currentLevel=level;
        this.currentParentId=parentid;
      
        this.loadData();
        
    }
    
    edit(level:number,item){
        this.currentLevel=level;
         let langs=this.translate.getLangs();
        if(item.id==0){
            langs.forEach(lang=>{
                let found=this.currentItem.name.filter(item => item.lang === lang);
                if(found.length==0)
                this.currentItem.name.push(new trans(lang,''));
            }); 
        }
        this.call.postRequest("/RequestCategory/ItemForEdit/"+item.id,"",
        next=>{
            this.currentItem=next;
            
            if(this.currentItem.name==null)this.currentItem.name=[];
            this.currentItem.name.forEach(item=>{
                let found=langs.filter(lang => item.lang === lang);
                if(found.length==0)
                this.currentItem.name.splice(this.currentItem.name.indexOf(item),1);
            }); 

            langs.forEach(lang=>{

                let found=this.currentItem.name.filter(item => item.lang === lang);
                if((found||[]).length==0)
                    this.currentItem.name.push(new trans(lang,''));
            }); 
        })
        this.open(this.content)
    }

    save(){
        let api="";
        if(this.currentItem.id>0){
             api="/RequestCategory/Edit";
        }else{
            api="/RequestCategory/Add";
        }
        this.call.postRequest(api,this.currentItem,
        next=>{
            this.shared.success("Save Success");
            this.modelInstance.close();
            if(api.endsWith("Add")){
                if(this.currentLevel==0){
                    this.roots.data.push(next);
                }
                if(this.currentLevel==1){
                    this.parents.data.push(next);
                }
                if(this.currentLevel==2){
                    this.items.data.push(next);
                }
            }
            if(api.endsWith("Edit")){
                if(this.currentLevel==0){
                    Object.assign(this.roots.data.filter(a=>a.id==next.id)[0],next);
                }
                if(this.currentLevel==1){
                    
                    Object.assign(this.parents.data.filter(a=>a.id==next.id)[0],next);
                }
                if(this.currentLevel==2){
                    Object.assign(this.items.data.filter(a=>a.id==next.id)[0],next);
                }
            }
         },   
        error=>{
            this.shared.error(error);
        });
         
    }
    delete(level:number,item:any){
        
        if(!confirm("Are you sure delete this type?")) return;
        this.call.postRequest("/RequestCategory/Delete/" + item.id ,"",
                  next=>{
                    if(level==0){
                        let index=this.roots.data.indexOf(item);
                        this.roots.data.splice(index,1);   
                    }
                    if(level==1){
                        let index=this.parents.data.indexOf(item);
                        this.parents.data.splice(index,1);   
                    }
                    if(level==2){
                        let index=this.items.data.indexOf(item);
                        this.items.data.splice(index,1);   
                    }
                    
                    });
    }
   
    open(content:any) {
        this.modelInstance=this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }
    
     
    add(level:number=0){
        this.currentItem={name:[],parent_id:this.currentParentId};
        let langs=this.translate.getLangs();

        langs.forEach(lang=>{
            this.currentItem.name.push(new trans(lang,''));
        }); 
        this.open(this.content);
    }
}
