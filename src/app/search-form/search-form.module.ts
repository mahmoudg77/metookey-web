import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { SearchFormComponent } from './search-form.component';
import { RouterModule } from '../../../node_modules/@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        TranslateModule
    ],
    declarations: [
        SearchFormComponent,
    ],
    exports: [
        SearchFormComponent,
    ]
})
export class SearchFormModule {

}
