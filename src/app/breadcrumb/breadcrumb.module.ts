import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { BreadcrumbComponent } from './breadcrumb.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,TranslateModule,RouterModule
    ],
    declarations: [
        BreadcrumbComponent,
    ],
    exports: [
        BreadcrumbComponent,
    ]
})
export class BreadcrumbModule {

}
