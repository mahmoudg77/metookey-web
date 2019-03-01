import { DataTablesModule } from 'angular-datatables';
import { AccountsRoutes } from './accounts.routing';
// Angular Imports
import { NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../core/directive/directives.module';

// This Module's Components
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { AccusersComponent } from '../accusers/accusers.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DirectivesModule,
        RouterModule.forChild(AccountsRoutes),
        NgbModule.forRoot(),
        DataTablesModule,
        TranslateModule
    ],
    declarations: [
        ListComponent,
        EditComponent,
        ViewComponent,
        AccusersComponent,
         
    ],
    exports: [
        ListComponent,
        EditComponent,
        ViewComponent,
        AccusersComponent,
     ]
})
 
export class AccountsModule  {

}
