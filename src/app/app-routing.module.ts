import { HomeComponent } from './home/home.component';
import { CatSelectExampleComponent } from './cats-select-example/cats-select-example.component';
import { AdminGuard } from './core/guard/admin.guard';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NewOrderComponent } from './orders/new-order/new-order.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { UserRoleComponent } from './security/user-role/user-role.component';
import { RedirectComponent } from './redirect/redirect.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { LangSwitchComponent } from './lang-switch/lang-switch.component';
import { ItemtypeEditComponent } from './dashboard/itemtype-edit/itemtype-edit.component';
import { CityEditComponent } from './dashboard/city-edit/city-edit.component';
import { CountryEditComponent } from './dashboard/country-edit/country-edit.component';
import { CategoryEditComponent } from './dashboard/category-edit/category-edit.component';
import { NewpasswordComponent } from './session/newpassword/newpassword.component';
import { ForgotPasswordComponent } from './session/forgot-password/forgot-password.component';
import { RegisterComponent } from './session/register/register.component';
import { LogoutComponent } from './session/logout/logout.component';
import { AuthGuard } from './core/guard/auth.guard';
import { Routes} from '@angular/router';

import { LoginoneComponent } from './session/loginone/loginone.component';
import { ProfileComponent } from './profile/profile.component';
import { ListProductComponent } from './product/list-product/list.component';
import { ProductDetailsComponent } from './product/product-details/details.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SectionEditComponent } from './dashboard/section-edit/section-edit.component';
import { ContactUsViewComponent } from './dashboard/contact-us-view/contact-us-view.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NewOrderMobileComponent } from './new-order-mobile/new-order-mobile.component';

export const AppRoutes: Routes = [
  // {
  //   path: '',
  //   redirectTo:'',
  //   pathMatch: 'full',},
     
      {
        path:'',
        component:HomeComponent
      },
      {
        path:'contact-us',
        component:ContactUsComponent,
        canActivate:[AuthGuard]
      },
      // {
      //   path: 'login',
      //   component: LoginoneComponent,
      // },
      // {
      //   path: 'register',
      //   component: HomeComponent,
      // },
      {
        path: 'login',
        component: LoginoneComponent,
        outlet: 'modal',
        //pathMatch: 'full'
      },
      {
        path:'cat-select',
        component:CatSelectExampleComponent
      },
      // {
      //   path: 'login-modal',
      //   component: LoginComponent,
      //   outlet: 'modal',
      //   //pathMatch: 'full'
      // },
      // {
      //   path: 'profile/:id',
      //   component: ProfileComponent,
      //   canActivate:[AuthGuard,AdminGuard]
      //  // outlet: 'modal',
      //   //pathMatch: 'full'
      // },
      // {
      //   path: 'product/details/:id',
      //   component: ProductDetailsComponent,
      // },
      {
        path: 'register/:key',
        component: RegisterComponent,
        outlet:'modal'
      },
      {
        path: 'register',
        component: RegisterComponent,
        outlet:'modal'
      },
      {
        path: 'redirect',
        component: RedirectComponent,
      },
      // {
      //   path: 'product/details/:id',
      //   component: ProductDetailsComponent,
      // },
      {
        path: 'product',
        children:[
          {
            path: 'list',
            component: ListProductComponent,
          },
          {
            path: 'details/:id',
            component: ProductDetailsComponent,
          },
          {
            path: 'new',
            component: EditProductComponent,
          },
          {
            path: 'edit/:id',
            component: EditProductComponent,
          },
        ]
      },

      {
        path:'session',
        //loadChildren:'./session/session.module#SessionDemoModule'
        children:[
          // {
          //   path: 'login',
          //   component: LoginoneComponent
          // },
          {
            path: 'logout',
            component: LogoutComponent
          },
          {
            path: 'register',
            component: RegisterComponent,
            outlet:'modal'
          },
          {
            path: 'register/:key',
            component: RegisterComponent,
            outlet:'modal'
          },
          {
            path: 'forgot-password/:key',
            component: ForgotPasswordComponent
          },
          {
            path: 'forgot-password',
            component: ForgotPasswordComponent
          },
          {
            path: 'newpassword',
            component: NewpasswordComponent
          },
        ]
      },
      {
        path:'product',
        loadChildren:'./product/product.module#ProductModule',
        canActivateChild:[AuthGuard],
      },
      {
        path:'dashboard',
        loadChildren:'./dashboard/dashboard.module#DashboardModule',
        canActivateChild:[AuthGuard,AdminGuard],
      },
      {
        path:'orders',
        loadChildren:'./orders/orders.module#OrdersModule',
        canActivateChild:[AuthGuard],
      },
      // {
      //   path:'orders',
      //   loadChildren:'./orders/orders.module#OrdersModule',
      // },
      {
        path: 'create-order',
        component: NewOrderComponent,
        //canActivate:[AuthGuard],
        outlet:'modal'
      },
      {
        path: 'create-order-mobile',
        component: NewOrderMobileComponent,
        //canActivate:[AuthGuard],
        //outlet:'modal'
      },
      {
        path: 'category-edit',
        component: CategoryEditComponent,
        canActivate:[AuthGuard,AdminGuard],
        outlet:'modal'
      },
      {
        path: 'category-edit/:id',
        component: CategoryEditComponent,
        canActivate:[AuthGuard,AdminGuard],
        outlet:'modal'
      },
      {
        path: 'country-edit/:id',
        component: CountryEditComponent,
        canActivate:[AuthGuard,AdminGuard],
        outlet:'modal'
      },
      {
        path: 'country-edit',
        component: CountryEditComponent,
        canActivate:[AuthGuard,AdminGuard],
        outlet:'modal'
      },
      {
        path: 'city-edit/:id',
        component: CityEditComponent,
        canActivate:[AuthGuard,AdminGuard],
        outlet:'modal'
      },
      {
        path: 'city-edit',
        component: CityEditComponent,
        canActivate:[AuthGuard,AdminGuard],
        outlet:'modal'
      },
      {
        path: 'itemtype-edit/:id',
        component: ItemtypeEditComponent,
        canActivate:[AuthGuard,AdminGuard],
        outlet:'modal'
      },
      {
        path: 'itemtype-edit',
        component: ItemtypeEditComponent,
        canActivate:[AuthGuard,AdminGuard],
        outlet:'modal'
      },
      {
        path: 'section-edit/:id',
        component: SectionEditComponent,
        canActivate:[AuthGuard,AdminGuard],
        outlet:'modal'
      },
      {
        path: 'section-edit',
        component: SectionEditComponent,
        canActivate:[AuthGuard,AdminGuard],
        outlet:'modal'
      },
      {
        path: 'edit-product',
        component: EditProductComponent,
        outlet:'modal'
      },
      {
        path: 'edit-product/:id',
        component: EditProductComponent,
        outlet:'modal'
      },
      {
        path: 'contactus-view/:id',
        component: ContactUsViewComponent,
        canActivate:[AuthGuard,AdminGuard],
        outlet:'modal'
      },
      {
        path: 'user-edit/:id',
        component: UserRoleComponent,
        canActivate:[AuthGuard,AdminGuard],
        outlet:'modal'
      },
      
      {
        path: 'lang/:lang',
        component: LangSwitchComponent,
      },
      {
        path: 'search/:q',
        component: SearchResultComponent,
      },
      {
        path: 'cat/:cat',
        component: SearchResultComponent,
      },
      {
        path: 'cat-search/:cat/:q',
        component: SearchResultComponent,
      },
      {
        path: 'invoice/:id',
        component: InvoiceComponent,
        canActivate:[AuthGuard],
      },
      {
        path: 'EditProfile',
        component: ProfileEditComponent,
        canActivate:[AuthGuard],
      },
      {
        path: 'notifications/:id',
        component: NotificationListComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'**',
        redirectTo:'',
        pathMatch:'full'
      },

  

  
// {
  // path: '',
  // component: MainComponent,
  // children: [
   
    // {
    // path: 'dashboard',
    // loadChildren: './dashboard/dashboard.module#DashboardModule',
    // }
    // ,
    // {
    //   path: 'accounts',
    //   loadChildren: './accounts/accounts.module#AccountsModule',
    //   canActivateChild:[AuthGuard]
    // },
    // {
    //   path: 'accusers/:id',
    //   loadChildren: './accusers/accusers.module#AccusersModule',
    //   canActivateChild:[AuthGuard]

    // }
    // ,
    // {
    //   path: 'security',
    //   loadChildren: './security/security-routing.module#SecurityModule',
    //   canActivateChild:[AuthGuard]

    // }
    
//   ],
// }
// ,
// {
//   path: '',
//   component: AuthComponent,
//   children: [{
//     path: 'session',
//     loadChildren: './session/session.module#SessionDemoModule'
//     }
//   ]
// },
// {
//   path:'**',
//   component:HomeComponent
// },
];

