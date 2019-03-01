import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { InvoiceComponent } from './invoice.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'app/core/pipes/pipes.module';
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
        InvoiceComponent,
    ],
    exports: [
        InvoiceComponent,
    ]
})
export class InvoiceModule {

}
