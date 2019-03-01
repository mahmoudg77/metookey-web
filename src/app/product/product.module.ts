
import { DetailsModule } from './product-details/details.module';
import { ListModule } from './list-product/list.module';

// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../core/directive/directives.module';
import { ProductRoutes } from './product.routing';
import { DataTablesModule } from 'angular-datatables';
import { EditProductModule } from './edit-product/edit-product.module';
import { ArchwizardModule } from 'ng2-archwizard';
import { WizardModule } from 'ng2-archwizard';
import { ModalModule } from 'app/modal/modal.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DirectivesModule,
        RouterModule.forChild(ProductRoutes),
        ListModule,
        DetailsModule,
        EditProductModule,
        DataTablesModule,
        ModalModule,
        TranslateModule
        //WizardModule,
        //ArchwizardModule
         
    ],
    declarations: [
      ],
    exports: [
           
    ]
})
export class ProductModule {

}
