import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { CustomerLeadsComponent } from './customer-leads.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule
    ],
    declarations: [
        CustomerLeadsComponent,
    ],
    exports: [
        CustomerLeadsComponent,
    ]
})
export class CustomerLeadsModule {

}
