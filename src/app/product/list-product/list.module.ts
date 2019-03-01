import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// This Module's Components
import { ListProductComponent } from './list.component';
import { DataTablesModule } from '../../../../node_modules/angular-datatables';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule, 
        DataTablesModule, 
        RouterModule,
        TranslateModule
    ],
    declarations: [
        ListProductComponent,
    ],
    exports: [
        ListProductComponent,
    ]
})
export class ListModule {

}
