import { AuthGuard } from './../core/guard/auth.guard';
import { CanActivate } from '@angular/router';
import { InvoiceComponent } from './../invoice/invoice.component';
import { OrderWaitingComponent } from './order-waiting/order-waiting.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { Routes, UrlSegment } from '@angular/router';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { MetookeyAppComponent } from 'app/app.component';
import { DashboardComponent } from 'app/dashboard/dashboard.component';

export const OrderRoutes: Routes = [
    {
    path: 'orders',
    canActivateChild:[AuthGuard],
    canActivate:[AuthGuard],
    children:[
            {
                path: '',
                component: OrderWaitingComponent
            },
            // {
            //     path: 'my-orders',
            //     children:[
                    {
                        path:'my-orders',
                        redirectTo:'my-orders/cobone',
                        pathMatch:'full'
                    },
                    {
                        path:'my-orders/cobone',
                        component:OrderWaitingComponent
                    },
                    {
                        path:'my-orders/cash',
                        component:OrderWaitingComponent
                    },
                    {
                        path:'my-orders/offer',
                        component:OrderWaitingComponent
                    },
                    {
                        path:'my-orders/receive',
                        component:OrderWaitingComponent
                    },
                    {
                        path:'my-orders/canceled',
                        component:OrderWaitingComponent
                    },
                    {
                        path:'my-orders/not-received',
                        component:OrderWaitingComponent
                    },
                    {
                        path:'my-orders/received',
                        component:OrderWaitingComponent
                    },
            //     ]
            // },
            {
                path: 'new',
                component: NewOrderComponent,
                //canActivate:[AuthGuard]
            },
            {
                path: 'details',
                component:DashboardComponent,
                children:[{
                    path:':id',
                    component:InvoiceComponent
                }]
            },
            // {
            //     path: 'waiting',
            //     children:[
                {
                    path:'waiting',
                    redirectTo:'waiting/cobone',
                    pathMatch:'full'
                },
                {
                    path:'waiting/cobone',
                    component:OrderWaitingComponent
                },
                {
                    path:'waiting/cash',
                    component:OrderWaitingComponent
                },
                {
                    path:'waiting/offer',
                    component:OrderWaitingComponent
                },
                {
                    path:'waiting/receive',
                    component:OrderWaitingComponent
                },
                {
                    path:'waiting/canceled',
                    component:OrderWaitingComponent
                },
                {
                    path:'waiting/not-received',
                    component:OrderWaitingComponent
                },
                {
                    path:'waiting/received',
                    component:OrderWaitingComponent
                },
            //     ]
            // },
            // {
            //     path:'**',
            //     redirectTo:'my-orders',
            //     pathMatch:'full'
            // }
        ]
    }
  ];