import { Component, OnInit } from '@angular/core';
import { Title } from '../../../../node_modules/@angular/platform-browser';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { SharedService } from '../../services/shared.service';
import { TranslateService } from '../../../../node_modules/@ngx-translate/core';
import { CallapiService } from '../../services/callapi.service';

@Component({
    moduleId: module.id,
    selector: 'user-role',
    templateUrl: 'user-role.component.html',
    styleUrls: ['user-role.component.scss']
})
export class UserRoleComponent implements OnInit {

    currentItem:any={roles:[]};
    id: number;
    roles: any=[];


   constructor(private pageTitleService: Title, 
    private route: Router, 
    private shared: SharedService,
    public translate: TranslateService,
    private call:CallapiService,
    private currentRoute:ActivatedRoute){
    
    }

    ngOnInit(): void {
        this.pageTitleService.setTitle('Edit User');
        this.currentRoute.params.subscribe(params=>{
            this.id = +params['id'];
            this.getRoles();
            this.loadItem();
        });
    }
    getRoles(){
        this.call.postRequest("/SecRole/All","",
            response=>{
                    this.roles=response.data;
            }
        )
    }
    loadItem(){
      
        this.call.postRequest("/User/ItemForEdit/"+this.id,"",
        next=>{
            this.currentItem=next;
        })
    }

    modalClose( $event=null ) {
         if($event){
            this.saveItem();
        }
    }

    saveItem(){
        let api="/User/Edit";
        this.call.postRequest(api,this.currentItem,
        next=>{
            this.shared.success("Save Success");
            this.shared.closeModal();
        });
    }
    toggleSelectRole(id:number){
        var i=this.currentItem.roles.filter(a=>a.role_id==id)[0];
        var o=[];
        o.splice
        if(i){
            var index=this.currentItem.roles.indexOf(i);
            this.currentItem.roles.splice(index,1);
        }else{
            this.currentItem.roles.push({ "user_id": this.currentItem.id,"role_id": id});
        }
    }
    check(id:number){
       return this.currentItem.roles.filter(a=>a.role_id==id).length>0?true:false;
    }
}
