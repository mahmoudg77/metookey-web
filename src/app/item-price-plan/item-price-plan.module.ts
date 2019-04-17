import { ItemPricePlanComponent } from './item-price-plan.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Angular Imports
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

// This Module's Components

@NgModule({
    imports: [
        CommonModule,FormsModule,
        TranslateModule
    ],
    declarations: [
        ItemPricePlanComponent,
    ],
    exports: [
        ItemPricePlanComponent,
    ]
})
export class ItemPricePlanModule {

}
