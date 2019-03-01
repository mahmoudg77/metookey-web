import { CommonModule } from '@angular/common';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { LangSwitchComponent } from './lang-switch.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LangSwitchComponent,
    ],
    exports: [
        LangSwitchComponent,
    ]
})
export class LangSwitchModule {

}
