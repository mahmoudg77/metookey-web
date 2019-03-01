import { RedirectComponent } from './redirect.component';
import { CommonModule } from '@angular/common';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        RedirectComponent,
    ],
    exports: [
        RedirectComponent,
    ]
})
export class RedirectModule {

}
