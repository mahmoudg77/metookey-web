import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// This Module's Components
import { DialogModalComponent } from './dialog-modal.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule
    ],
    declarations: [
        DialogModalComponent,
    ],
    exports: [
        DialogModalComponent,
    ]
})
export class DialogModalModule {

}
