import { FormsModule } from '@angular/forms';
import { CatSelectModule } from './../cats-select/cat-select.module';
// Angular Imports
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';
// This Module's Components
import { ProfileComponent } from './profile.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        NgbModule.forRoot(),
        CatSelectModule,
        CommonModule,
        FormsModule,
        TranslateModule
    ],
    declarations: [
        ProfileComponent,
    ],
    exports: [
        ProfileComponent,
    ]
})
export class ProfileModule {

}
