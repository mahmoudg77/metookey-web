import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { MyModalComponent } from 'app/my-modal/my-modal.component';

@Injectable({
  providedIn: 'root'
})
export class MyToasterService {
 
  icon:string="fa-check-circle-o";
  message:string="Save Success";
  title:string="Success";
  type?:"success"|"warning"|"danger"|"info"="success";
  
  constructor(
    private modalService: NgbModal,
  ) {
   
   }
   open() {
    const modalRef = this.modalService.open(MyModalComponent,{windowClass:'success-popup border-rounded',centered:true});
    modalRef.componentInstance.icon = this.icon; // should be the id
    modalRef.componentInstance.message = this.message; // should be the id
    modalRef.componentInstance.title = this.title; // should be the id
    modalRef.componentInstance.type = this.type; // should be the id

    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
    //this.modal = this.modalService.open(this.template,{ariaLabelledBy: 'modal-basic-title',size:'lg'});
  }
  success(message:string,title:string=""){
    this.icon="fa-check-circle-o";
    this.message=message;
    this.title=title;
    this.type="success";
    this.open();
  }
  error(message:string,title:string=""){
    this.icon="fa-times-circle-o";
    this.message=message;
    this.title=title;
    this.type="danger";
    this.open();
  }
  warining(message:string,title:string=""){
    this.icon="fa-exclamation-circle";
    this.message=message;
    this.title=title;
    this.type="warning";
    this.open();
  }

}
