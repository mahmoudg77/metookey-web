import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductCardModule } from './../product-card/product-card.module';
import { CommonModule } from '@angular/common';
// Angular Imports
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
// This Module's Components
import { CategorySectionComponent } from './category-section.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ProductCardModule,
        CarouselModule,
        RouterModule,
        TranslateModule
    ],
    declarations: [
        CategorySectionComponent,
    ],
    exports: [
        CategorySectionComponent,
    ]
})
export class CategorySectionModule {

}
