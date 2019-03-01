import { CatSelectModule } from './../cats-select/cat-select.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { MyToasterService } from 'app/services/my-toaster.service';

@Component({
    moduleId: module.id,
    selector: 'cats-select-example',
    template: '<label class="form-control" *ngFor="let c of cats;let i=index;">{{c.name}} \
                <a class="close" (click)="cats.splice(i,1)">&times;</a> \
                </label> \
                <input type="button" value="Select Category" (click)="cat.open()"> \
                <cat-select [(selected)]="cats" #cat></cat-select>\
                ',
    styles: []
})
export class CatSelectExampleComponent {
    
    cats:any[]=[]; //Declare variable to store selected categories
constructor(){

}


}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,

        CatSelectModule  //Add this module in inmport section
    ],
    declarations: [
        CatSelectExampleComponent
    ],
    exports: [
        CatSelectExampleComponent,
    ],
    
})
export class CatSelectExampleModule {

}