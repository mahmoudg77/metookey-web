import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { RequestCategoryComponent } from './request-category.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { TreeModule } from 'ng2-tree';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        DataTablesModule,
        BrowserModule,
        NgbModalModule,
        TranslateModule
        
    ],
    declarations: [
        RequestCategoryComponent,
    ],
    exports: [
        RequestCategoryComponent,
    ]
})
export class RequestCategoryModule {

}
