import { SectionEditComponent } from './section-edit/section-edit.component';
import { SettingModule } from './setting/setting.module';
import { PipesModule } from './../core/pipes/pipes.module';
import { ProductModule } from './../product/product.module';
import { ItemtypeEditComponent } from './itemtype-edit/itemtype-edit.component';
import { CityEditComponent } from './city-edit/city-edit.component';
import { CityComponent } from './city/city.component';
import { CountryEditComponent } from './country-edit/country-edit.component';
import { CountryComponent } from './country/country.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { ModalModule } from './../modal/modal.module';
import { DataTablesModule } from 'angular-datatables';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { SidebarComponent } from './../sidebar/sidebar.component';
import { AccountsModule } from '../accounts/accounts.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../core/directive/directives.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { CategoryComponent } from './category/category.component';
import { ItemtypeComponent } from './itemtype/itemtype.component';
import { ViewRequestsComponent } from './view-requests/view-requests.component';
import { RequestCategoryModule } from './request-category/request-category.module';
import { SectionComponent } from './section/section.component';
import { ContactUsListComponent } from './contact-us-list/contact-us-list.component';
import { ContactUsViewComponent } from './contact-us-view/contact-us-view.component';
import { OrdersModule } from 'app/orders/orders.module';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { TranslationEditorModule } from './translation-editor/translation-editor.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DirectivesModule,
    TranslateModule,
    AccountsModule,
    RouterModule.forChild(DashboardRoutes),
    //RouterModule.forRoot(DashboardRoutes),
    DataTablesModule,
    ModalModule,
    ProductModule,
    SettingModule,
    RequestCategoryModule,
    OrdersModule,
    PipesModule,
    TranslationEditorModule

  ],
  declarations: [ 
    DashboardComponent,
    SidebarComponent, 
    DashboardHomeComponent,
    CountryComponent,
    CountryEditComponent,
    CityComponent,
    CityEditComponent,
    ItemtypeComponent,
    ItemtypeEditComponent,
    ViewRequestsComponent,
    CategoryComponent,
    CategoryEditComponent,
    SectionComponent,
    ContactUsListComponent,
    SectionEditComponent,
    ContactUsViewComponent,
    SubscriptionsComponent
  ],
  exports:[
    SidebarComponent
  ],
  entryComponents:[
   

  ],
  providers:[
    
		DatePipe
  ]
})
//
export class DashboardModule {}
//export const routingModule: ModuleWithProviders = RouterModule.forRoot(DashboardRoutes);
