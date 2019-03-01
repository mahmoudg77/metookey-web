// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../core/directive/directives.module';
import { DataTablesModule } from 'angular-datatables';

// This Module's Components
import { AccusersComponent } from './accusers.component';
import { accusersRoutes } from './accusers.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DirectivesModule,DataTablesModule,
        RouterModule.forChild(accusersRoutes),
        NgbModule.forRoot(),
    ],
    declarations: [
        //AccusersComponent,
    ],
    exports: [
       // AccusersComponent,
    ]
})

export class AccusersModule {

}


