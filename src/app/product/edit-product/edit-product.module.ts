import { CatSelectModule } from './../../cats-select/cat-select.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArchwizardModule } from 'ng2-archwizard';
// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// This Module's Components
import { EditProductComponent } from './edit-product.component';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
// import {MatStepperModule} from '@angular/material/stepper';
import {MatNativeDateModule, MatStepperModule} from '@angular/material';
import { MaterialModule } from '../../core/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxInputTagModule } from 'ngx-input-tag';

@NgModule({
    imports: [
        CommonModule, 
        DataTablesModule,
        RouterModule, 
        FormsModule,
        ArchwizardModule,
        MaterialModule,
        MatNativeDateModule,
        NgbModule,
        TranslateModule,
        CatSelectModule, 
        MatStepperModule,
        NgxInputTagModule,
        ReactiveFormsModule,
        TranslateModule
    ],
    declarations: [
        EditProductComponent,
    ],
    exports: [
        EditProductComponent,
    ]
})
export class EditProductModule {

}
