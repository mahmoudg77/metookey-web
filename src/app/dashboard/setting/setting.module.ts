import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { SettingComponent } from './setting.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        TranslateModule

    ],
    declarations: [
        SettingComponent,
    ],
    exports: [
        SettingComponent,
    ]
})
export class SettingModule {

}
