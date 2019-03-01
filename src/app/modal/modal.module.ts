// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// This Module's Components
import { ModalComponent } from './modal.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        ModalComponent,
    ],
    exports: [
        ModalComponent,
    ]
})
export class ModalModule {

}
