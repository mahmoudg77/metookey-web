import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { TranslationEditorComponent } from './translation-editor.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        RouterModule,
        DataTablesModule
    ],
    declarations: [
        TranslationEditorComponent,
    ],
    exports: [
        TranslationEditorComponent,
    ]
})
export class TranslationEditorModule {

}
