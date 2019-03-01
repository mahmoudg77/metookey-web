import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { UserPasswordComponent } from './user-password.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        ReactiveFormsModule
    ],
    declarations: [
        UserPasswordComponent,
    ],
    exports: [
        UserPasswordComponent,
    ]
})
export class UserPasswordModule {

}
