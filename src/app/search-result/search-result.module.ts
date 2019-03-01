import { ProductCardModule } from './../product-card/product-card.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { SearchResultComponent } from './search-result.component';
import { DirectivesModule } from '../core/directive/directives.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ProductCardModule,
        DirectivesModule,
        TranslateModule

    ],
    declarations: [
        SearchResultComponent,
    ],
    exports: [
        SearchResultComponent,
    ]
})
export class SearchResultModule {

}
