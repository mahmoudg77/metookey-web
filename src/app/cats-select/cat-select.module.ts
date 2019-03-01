import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { CatSelectComponent } from './cat-select.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        NgbModule,
        TranslateModule
        
    ],
    declarations: [
        CatSelectComponent,
    ],
    exports: [
        CatSelectComponent,
    ]
})
export class CatSelectModule {

}
