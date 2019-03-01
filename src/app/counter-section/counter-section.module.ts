import { CommonModule } from '@angular/common';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { CounterSectionComponent } from './counter-section.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CounterSectionComponent,
    ],
    exports: [
        CounterSectionComponent,
    ]
})
export class CounterSectionModule {

}
