import { ProductCardModule } from './../product-card/product-card.module';
import { CommonModule } from '@angular/common';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { NewArrivalsComponent } from './new-arrivals.component';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'app/core/pipes/pipes.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ProductCardModule,
        PipesModule
    ],
    declarations: [
        NewArrivalsComponent,
    ],
    exports: [
        NewArrivalsComponent,
    ]
})
export class NewArrivalsModule {

}
