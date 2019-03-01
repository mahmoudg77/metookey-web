import { CallapiService } from 'app/services/callapi.service';
import { GlobalData } from './../services/global-data';
import { Component, Output, Input, EventEmitter, ViewChild, ElementRef, OnChanges, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    moduleId: module.id,
    exportAs:"categorySelector",
    selector: 'cat-select',
    templateUrl: 'cat-select.component.html',
    styleUrls: ['cat-select.component.scss'],
})
export class CatSelectComponent implements OnChanges,OnInit {
    ngOnInit(): void {
        this.selected=this.selected;
        this.loadCategories();
    }

    @Input() selected:any[];
    @Output() onSelectedChange: EventEmitter<any[]> = new EventEmitter<any[]>();
    
    categoriesModal:NgbModalRef;
    global=GlobalData;
    categories:any[];
    @ViewChild('categorySelector') categorySelector: ElementRef;
    constructor(
        private modalService: NgbModal,
        private call :CallapiService,
        ){

    }

    open() {
        

        this.categoriesModal = this.modalService.open(this.categorySelector,{ariaLabelledBy: 'modal-basic-title',size:'lg'});
    }
    
    ngOnChanges() {
        console.log("Selected equals: ", this.selected);
      }
     check(category:any){
         var items=this.selected.filter(a=>a.id==category.id);
         return items.length>0;
     }
    toggleSelectedCategories(cat:any){
        var items=this.selected.filter(a=>a.id==cat.id);
        if(items.length>0){
           items.forEach(i=>{
               this.selected.splice( this.selected.indexOf(i),1);
           })
        }else{
            this.selected.push(cat);
        }
    }
    loadCategories(){
        this.call.postRequest("/Category/All",{length:100},next=>{this.categories=next.data});
    }
}
