import { SharedService } from '../services/shared.service';
import { CallapiService } from '../services/callapi.service';
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { fadeInAnimation } from '../core/route-animation/route.animation';
import { Title } from '@angular/platform-browser';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'accusers',
    templateUrl: 'accusers.component.html',
    styleUrls: ['accusers.component.scss'],
    host: {"[@fadeInAnimation]": 'true'},
    animations: [fadeInAnimation]
})
export class AccusersComponent implements OnInit{
    id:number;
    Users:any[];
    CurrentUser:any;
    dtOptions: DataTables.Settings = {};

    permission:any={};
    is_acc_manager = false;
    active = false;
    isEditRowID:any = '';
    public mr:NgbModalRef;

    constructor(
        private title: Title, 
        private call:CallapiService, 
        public shared: SharedService, 
        private modalService: NgbModal,
        private _location: Location, 
        private route: ActivatedRoute) {
    }

    open(content:any) {
        this.mr = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }

    ngOnInit() {
        this.title.setTitle("View Accounts");

        this.route.params.subscribe(params=>{
            this.id = +params['id'];
            this.hasAccess();
            this.getAccUsers();
            this.addUser();
        });
    }

    addUser() {
        this.CurrentUser = {};
        this.isEditRowID = "";
        this.is_acc_manager = false;
    }

    editUser(val){
        this.CurrentUser = val;
        this.isEditRowID = val;
    }

    viewUser(val){
        this.CurrentUser = val;
    }

    backClicked() {
        this._location.back();
    }

    isAccManager(e){
        this.is_acc_manager = e.target.checked;
    }
    isActive(e){
            this.active = e.target.checked;
        }
    getAccUsers(){
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            serverSide: true,
            processing: true,
            ajax: (dataTablesParameters: any, callback) => {
                this.call.postRequest("/AccountUsers/All?AccountID=" + this.id ,dataTablesParameters ,
                    next=>{
                         
                        this.Users=next.data.data;
                        callback({
                            recordsTotal: next.data.recordsTotal,
                            recordsFiltered: next.data.recordsFiltered,
                            data: []
                        });
                        
                    },
                    error=>{console.log(error);},
                    
            )
            },
            columns: [{ data: 'name' } , { data: 'userid' },{ data: 'pass' },{ data: 'phone' },
                { data: 'email' } ,{ name: 'Action',orderable:false,searchable:false }
            ],
        }
    }

    saveUser() {
        this.CurrentUser.acc_id = this.id;
        //console.log(this.CurrentUser);
        if(this.isEditRowID == ''){
            this.CurrentUser.is_acc_manager = this.is_acc_manager;
            this.CurrentUser.active = this.active;
            this.call.postRequest("/AccountUsers/Add", this.CurrentUser,
                next=>{
                    
                    this.call.postRequest("/AccountUsers/Item/"+next.data.id, "",
                        next=>{
                            
                            this.Users.push(next);
                            this.addUser();
                            this.mr.close();
                            
                        },
                        error=>{console.log(error);},
                       
                    )
                    //alert('Data Saving !!');
                     
                },
                error=>{
                console.log(error);
                }
                
            )
        }else{
            this.CurrentUser.is_acc_manager = this.is_acc_manager;
            this.CurrentUser.active = this.active;
            this.call.postRequest("/AccountUsers/Edit", this.CurrentUser,
                next=>{
                   
                        this.call.postRequest("/AccountUsers/Item/"+next.id, "",
                            response=>{
                                
                                //this.Users.push(next.data);
                                this.CurrentUser = response;
                                this.addUser();
                                this.mr.close();
                                 
                            },
                            error=>{console.log(error);},
                             
                        )
                    
                    
                },
                error=>{
                console.log(error);
                }
            );
        }
        
    }

    hasAccess(){
        this.call.postRequest("/User/HasAccess", [
            {'Screen':'AccountUsers', 'Method':'All'},
            {'Screen':'AccountUsers', 'Method':'Add'},
            {'Screen':'AccountUsers', 'Method':'Edit'},
            {'Screen':'AccountUsers', 'Method':'Delete'},
            ],
            next=>{
                 
                this.permission=next;
                
            },
            error=>{
            console.log(error);
            } 
        )
    }

    deleteUser(val){
        const index: number = this.Users.indexOf(val);
        if(confirm("Are you sure to delete ")) {
            this.call.postRequest("/AccountUsers/Delete/"+val.id, this.CurrentUser,
                next=>{
                    
                        if (index !== -1) {
                            this.Users.splice(index, 1);
                        }
                    
                },
                error=>{
                console.log(error);},
                 
            )
        }
    }

}
