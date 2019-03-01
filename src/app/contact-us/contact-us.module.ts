import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { ContactUsComponent } from './contact-us.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule
    ],
    declarations: [
        ContactUsComponent,
    ],
    exports: [
        ContactUsComponent,
    ]
})
export class ContactUsModule {

}
