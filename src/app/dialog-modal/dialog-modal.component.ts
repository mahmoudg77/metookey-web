import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { SharedService } from 'app/services/shared.service';

declare var $:any;
@Component({
    selector: 'dialog-modal',
    templateUrl: './dialog-modal.component.html',
    styleUrls: ['./dialog-modal.component.scss'],
  })
  export class DialogModalComponent {
   
    @Input() size:string="md";
    @Output() modalClose : EventEmitter<any> = new EventEmitter<any>();
    constructor( private router : Router,private shared:SharedService,public activeModal:NgbActiveModal) {
    }
      
    
  }
