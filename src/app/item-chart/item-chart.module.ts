import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { ItemChartComponent } from './item-chart.component';

@NgModule({
    imports: [
        CommonModule,FormsModule
    ],
    declarations: [
        ItemChartComponent,
    ],
    exports: [
        ItemChartComponent,
    ]
})
export class ItemChartModule {

}
