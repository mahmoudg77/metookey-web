import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { NotificationListComponent } from './notification-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DataTablesModule,
        TranslateModule,
        RouterModule
    ],
    declarations: [
        NotificationListComponent,
    ],
    exports: [
        NotificationListComponent,
    ]
})
export class NotificationListModule {

}
