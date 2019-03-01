import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { CallapiService } from '../../services/callapi.service';
import { Component, OnInit } from '@angular/core';
import { SELECT_VALUE_ACCESSOR } from '@angular/forms/src/directives/select_control_value_accessor';

@Component({
    moduleId: module.id,
    selector: 'roles',
    templateUrl: 'roles.component.html',
    styleUrls: ['roles.component.scss']
})
export class RolesComponent implements OnInit{
    roles: any;
    screens: any;
    methods: any;
    ngOnInit(): void {
        this.pageTitleService.setTitle("Security - Permissions");
    }
    model:any={};
    constructor(private pageTitleService: Title, private route: Router, private shared: SharedService,private call:CallapiService){
        this.getRoles();
        this.getScreens();
    }

    savePermissions(){
        this.call.postRequest("/SecRole/SavePermissions",this.model,
            response=>{
               
                    this.shared.success("Save success");
               
            },
            error=>{
                this.shared.error(error);
                console.log(error);
            }
        )
    }
    getRoles(){
        this.call.postRequest("/SecRole/All","",
            response=>{
                    this.roles=response.data;
            },
            error=>{
                this.shared.error(error);
            }
        )
    }
    getScreens(){
        this.call.postRequest("/SecRole/Screens","",
            response=>{
                
                    this.screens=response;
                
            },
            error=>{
                //this.shared.error(error);
            }
        )
    }
    getMethods(screen:string,roleid:number){
        this.model.methods=null;
        this.getSelectedMethods(screen,roleid);

        this.call.postRequest("/SecRole/Methods?Screen="+screen,"" ,
            response=>{
                
                    this.methods=response;
                
            },
            error=>{
                //this.shared.error(error);
            }
        )

    }
    getSelectedMethods(screen:string,roleid:number){
        this.model.methods=[];
        this.call.postRequest("/SecRole/RoleMethods?screen="+screen+"&role="+roleid,"",
            response=>{
                 
                    this.model.methods=response;
               
            },
            error=>{
                //this.shared.error(error);
            }
        )
    }

    toggleSelectMethod(method:string){
        if(this.model.methods.indexOf(method)>-1){
            this.model.methods.splice(this.model.methods.indexOf(method),1);
        }else{
            if(this.model.methods==undefined || this.model.methods==null)this.model.methods=[];
            this.model.methods.push(method);
        }
    }
}
