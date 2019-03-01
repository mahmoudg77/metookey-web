import { AdminGuard } from './../core/guard/admin.guard';
import { ProfileComponent } from './../profile/profile.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { ViewRequestsComponent } from './view-requests/view-requests.component';
import { CityComponent } from './city/city.component';

import { CountryComponent } from './country/country.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { RolesComponent } from './../security/roles/roles.component';
import { ViewComponent } from './../accounts/view/view.component';
import { EditComponent } from './../accounts/edit/edit.component';
import { CategoryComponent } from './category/category.component';
import { AuthGuard } from './../core/guard/auth.guard';
import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { SettingComponent } from './setting/setting.component';
import { ListComponent } from '../accounts/list/list.component';
import { ItemtypeComponent } from './itemtype/itemtype.component';
import { ListProductComponent } from '../product/list-product/list.component';
import { EditProductComponent } from '../product/edit-product/edit-product.component';
import { RequestCategoryComponent } from './request-category/request-category.component';
import { OrderWaitingComponent } from 'app/orders/order-waiting/order-waiting.component';
import { SectionComponent } from './section/section.component';
import { ContactUsListComponent } from './contact-us-list/contact-us-list.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { TranslationEditorComponent } from './translation-editor/translation-editor.component';

export const DashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    //canActivate:[AuthGuard,AdminGuard] ,
    //canActivateChild:[AuthGuard,AdminGuard],
    children:[
      {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
      },
      {
        path: 'accounts',
        canActivateChild:[AuthGuard],
        children:[
          {
            path: 'list',
            component: ListComponent,
            canActivate:[AuthGuard,AdminGuard]  
            //outlet:"dashboard"
          },
          {
            path: ':id',
            component: ProfileComponent,
            canActivate:[AuthGuard,AdminGuard]
           // outlet: 'modal',
            //pathMatch: 'full'
          },
        ]
      },
      {
        path: 'product',
        //redirectTo:'product/list',
        children:[
          {
            path: 'list',
            component: ListProductComponent,
            canActivate:[AuthGuard,AdminGuard]  
            //outlet:"dashboard"
          },
        ]
      },
      {
        path: 'security',
        //loadChildren:'./../security/security-routing.module#SecurityModule',
        //outlet:"dashboard"
        children:[
          {
            path: 'roles',
            component: RolesComponent,
            canActivate:[AuthGuard,AdminGuard]  
          },
        ]
      },
      {
        path: 'setting',
        component:SettingComponent ,
        canActivate:[AuthGuard,AdminGuard]   
        //outlet:"dashboard"
      },
      {
        path: 'category',
        component:CategoryComponent,
        canActivate:[AuthGuard,AdminGuard]   ,
        runGuardsAndResolvers: 'always',

        //outlet:"dashboard"
      },
      
      {
        path: 'country',
        component:CountryComponent,
        canActivate:[AuthGuard,AdminGuard]  
        //outlet:"dashboard"
      },
      {
        path: 'subscriptions',
        component:SubscriptionsComponent,
        canActivate:[AuthGuard,AdminGuard]  
        //outlet:"dashboard"
      },
      {
        path: 'city',
        component:CityComponent,
        canActivate:[AuthGuard,AdminGuard]    
        //outlet:"dashboard"
      },
     {
        path: 'itemtype',
        component:ItemtypeComponent,
        canActivate:[AuthGuard,AdminGuard]  
        //outlet:"dashboard"
      }, 
      {
        path: 'section',
        component:SectionComponent,
        canActivate:[AuthGuard,AdminGuard]     
        //outlet:"dashboard"
      },
      {
        path: 'contactus',
        component:ContactUsListComponent,
        canActivate:[AuthGuard,AdminGuard]  
        //outlet:"dashboard"
      },
      {
        path: 'home',
        component:DashboardHomeComponent,
        canActivate:[AuthGuard,AdminGuard]  
        //outlet:"dashboard"
      },
      {
        path: 'view-requests',
        component:ViewRequestsComponent,
        canActivate:[AuthGuard,AdminGuard]  
        //outlet:"dashboard"
      },
      {
        path: 'request-category',
        component:RequestCategoryComponent,
        canActivate:[AuthGuard,AdminGuard]    
        //outlet:"dashboard"
      },
      {
        path: 'translate-editor',
        component:TranslationEditorComponent,
        canActivate:[AuthGuard,AdminGuard]    
        //outlet:"dashboard"
      },
      {
        path: 'orders',
        canActivateChild:[AuthGuard,AdminGuard],
        canActivate:[AuthGuard,AdminGuard],
        children:[
                {
                    path:'waiting',
                    redirectTo:'waiting/cobone',
                    pathMatch:'full'
                },
                {
                    path:'waiting/cobone',
                    component:OrderWaitingComponent,
                    canActivate:[AuthGuard,AdminGuard],
                },
                {
                    path:'waiting/cash',
                    component:OrderWaitingComponent,
                    canActivate:[AuthGuard,AdminGuard],
                },
                {
                    path:'waiting/offer',
                    component:OrderWaitingComponent,
                    canActivate:[AuthGuard,AdminGuard],
                },
                {
                    path:'waiting/receive',
                    component:OrderWaitingComponent,
                    canActivate:[AuthGuard,AdminGuard],
                },
                {
                    path:'waiting/canceled',
                    component:OrderWaitingComponent,
                    canActivate:[AuthGuard,AdminGuard],
                },
                {
                    path:'waiting/not-received',
                    component:OrderWaitingComponent,
                    canActivate:[AuthGuard,AdminGuard],
                },
                {
                    path:'waiting/received',
                    component:OrderWaitingComponent,
                    canActivate:[AuthGuard,AdminGuard],
                },
              ]
            },
            {
              path: 'profile/:id',
              component: ProfileComponent,
              canActivate:[AuthGuard,AdminGuard]
             // outlet: 'modal',
              //pathMatch: 'full'
            },
      {
        path:'**',
        redirectTo:'home',
        pathMatch:'full'
      },
    ]
  },
  

];
