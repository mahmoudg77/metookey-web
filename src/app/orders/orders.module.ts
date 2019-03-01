import { OrderWaitingComponent } from './order-waiting/order-waiting.component';
import { PipesModule } from 'app/core/pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderRoutes } from './orders-routing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './order-details/order-details.component';
// Angular Imports
import { NgModule, Component } from '@angular/core';
import { NewOrderComponent } from './new-order/new-order.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'app/modal/modal.module';
import { NgxPayPalModule } from 'ngx-paypal';
import { DataTablesModule } from 'angular-datatables';
import { TranslateModule } from '@ngx-translate/core';
// This Module's Components
import { NgxBraintreeModule } from 'ngx-braintree'
@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(OrderRoutes),
    NgbModule,
    ModalModule,
    PipesModule,
    NgxPayPalModule,
    DataTablesModule, 
    RouterModule,
    ModalModule,
    TranslateModule,
    NgxBraintreeModule,
    ],
    declarations: [
        NewOrderComponent,
        MyOrdersComponent,
        OrderDetailsComponent,
        OrderWaitingComponent
        
    ],
    exports: [
        NewOrderComponent,
        MyOrdersComponent,
        OrderDetailsComponent,
        OrderWaitingComponent
    ]
})
export class OrdersModule {

}
