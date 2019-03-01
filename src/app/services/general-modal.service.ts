import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class GeneralModalService {

  constructor(
    private modalService: NgbModal,  
    ) { }


  open(component:any){
    const modalRef = this.modalService.open(component,{windowClass:'success-popup border-rounded',centered:true});
  }
 
}
