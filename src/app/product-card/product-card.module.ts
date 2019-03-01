import { PipesModule } from './../core/pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {  RangePipe } from './../core/pipes/range';
import { CommonModule } from '@angular/common';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { ProductCardComponent } from './product-card.component';
import {TimeAgoPipe} from 'time-ago-pipe';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        PipesModule,
        TranslateModule
        

    ],
    declarations: [
        ProductCardComponent,
 
    ],
    exports: [
        ProductCardComponent   ]
})
export class ProductCardModule {

}
