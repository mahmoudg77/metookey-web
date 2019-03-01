import { trans } from './../../core/models/trans';
import { CallapiService, imageData } from './../../services/callapi.service';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from './../../services/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'environments/environment';
 
@Component({
    moduleId: module.id,
    selector: 'category-edit',
    templateUrl: 'category-edit.component.html',
    styleUrls: ['category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {
   currentItem:any={name:[]};
    id: number;
    selectedImage=null;
    public imageUrl=environment.mediaServer;
    clang:string="";
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
        this.pageTitleService.setTitle('Edit Category');
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
        this.call.postRequest("/Category/ItemForEdit/"+this.id,"",
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
             api="/Category/Edit";
             
        }else{
            api="/Category/Add";
        }
        this.call.postRequest(api,this.currentItem,
        next=>{
            if(this.selectedImage!=null){
                var img=new imageData(this.selectedImage,'tbl_categories',next.id,this.call);
                img.upload(success=>{console.log(success)},error=>{console.error(error)});
                this.shared.success("Save Success");
                this.shared.closeModal();
                // this.route.navigate(['/','dashboard','category']);
             }else{
                 this.shared.success("Save Success");
                 this.shared.closeModal();
                 //  this.route.navigate(['/','dashboard','category']);

            }
           
        },    
    error=>{
        this.shared.error(error);
    });
    }
   
    
    onFileSelected(event){
        this.selectedImage=event.target.files[0];
    }   

}
