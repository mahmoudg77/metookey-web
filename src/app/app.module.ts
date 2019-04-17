import { FirebaseMessagesService } from './services/firebase-messages.service';
import { NewOrderMobileComponent } from './new-order-mobile/new-order-mobile.component';
import { CounterSectionModule } from './counter-section/counter-section.module';
import { DialogModalModule } from './dialog-modal/dialog-modal.module';
import { HomeComponent } from './home/home.component';
import { WindowService } from './services/window.service';
import { MetookeyerGuard } from './core/guard/metookeyer.guard';
import { AdminGuard } from './core/guard/admin.guard';
import { CustomerLeadsModule } from './customer-leads/customer-leads.module';
import { ContactUsModule } from './contact-us/contact-us.module';
import { OrdersModule } from './orders/orders.module';
import { InvoiceModule } from './invoice/invoice.module';
import { CatSelectModule } from './cats-select/cat-select.module';
import { CatSelectExampleModule } from './cats-select-example/cats-select-example.component';
import { DirectivesModule } from './core/directive/directives.module';
import { PipesModule } from './core/pipes/pipes.module';
import { RedirectModule } from './redirect/redirect.module';
import { TimeAgoPipe } from 'time-ago-pipe';
import { CategorySectionModule } from './category-section/category-section.module';
import { RangePipe } from './core/pipes/range';
import { ProductCardModule } from './product-card/product-card.module';
import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { SearchFormModule } from './search-form/search-form.module';
import { ItemChartComponent } from './item-chart/item-chart.component';
import { ItemChartModule } from './item-chart/item-chart.module';
import { CookieService } from 'ngx-cookie-service';
import { ModalModule } from './modal/modal.module';
import { ModalComponent } from './modal/modal.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { SessionDemoModule } from './session/session.module';
import { AuthGuard } from './core/guard/auth.guard';
import { SecurityModule } from './security/security-routing.module';
import { CallapiService } from './services/callapi.service';
import { AuthService } from './services/auth.service';
import { SharedService } from './services/shared.service';
import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations"
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';


import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { SidebarModule } from 'ng-sidebar';
import {Ng5BreadcrumbModule, BreadcrumbService} from 'ng5-breadcrumb';
// import 'hammerjs';

import { MetookeyAppComponent} from './app.component';
import { AppRoutes } from "./app-routing.module";
import { MainComponent }   from './main/main.component';
import { AuthComponent }   from './auth/auth.component';
import { MenuToggleModule } from './core/menu/menu-toggle.module';
import { MenuItems } from './core/menu/menu-items/menu-items';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ToastrModule } from 'ngx-toastr';

import { MatTabsModule } from '@angular/material';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';


 
import { LoginoneComponent } from './session/loginone/loginone.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileModule } from './profile/profile.module';
import { ProductModule } from './product/product.module';
import { LangSwitchModule } from './lang-switch/lang-switch.module';
import { SearchResultModule } from './search-result/search-result.module';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ExcelService } from './services/excel.service';
import { NgxInputTagModule } from 'ngx-input-tag';
import { PaypalService } from './services/paypal.service';
import { NotificationListModule } from './notification-list/notification-list.module';
import { UserPasswordModule } from './user-password/user-password.module';
import { MyModalComponent } from './my-modal/my-modal.component';
import { MyModalModule } from './my-modal/my-modal.module';
import { RegisterComponent } from './session/register/register.component';
import { GeneralModalService } from './services/general-modal.service';
import { NewArrivalsModule } from './new-arrivals/new-arrivals.module';
import { ShareButtonsModule } from './share-buttons/share-buttons.module';
import { NgxBraintreeModule } from 'ngx-braintree';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AsyncPipe } from '@angular/common';
// import { PageTitleService } from './core/page-title/page-title.service';

/********** Custom option for ngx-translate ******/
export function createTranslateLoader(http: HttpClient) {
   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
} 

const perfectScrollbarConfig: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		SidebarModule.forRoot(),
		RouterModule.forRoot(AppRoutes,{ enableTracing: false,onSameUrlNavigation: 'reload',scrollPositionRestoration: 'enabled' }),
		FlexLayoutModule,
		Ng5BreadcrumbModule.forRoot(),
		AgmCoreModule.forRoot({apiKey: 'AIzaSyBtdO5k6CRntAMJCF-H5uZjTCoSGX95cdk'}),
        PerfectScrollbarModule,
        MenuToggleModule,
		HttpClientModule,
         TranslateModule.forRoot({
	         loader: {
	            provide: TranslateLoader,
	            useFactory: createTranslateLoader,
	            deps: [HttpClient]
	         }
		  }),
		  SecurityModule,
		  SessionDemoModule,
		  DashboardModule,
		  ModalModule,
		  NgbModule.forRoot(),
		  ProfileModule,
		  TranslateModule,
		  ReactiveFormsModule,
		  ProductModule,
		  ItemChartModule,
		  SearchFormModule,
		  ProductCardModule,
		  CategorySectionModule,
		  LangSwitchModule,
		  SearchResultModule,
		  RedirectModule,
		  PipesModule,
		  ToastrModule.forRoot({timeOut: 5000,positionClass: 'toast-top-center',progressBar:true}),
		 DirectivesModule,
		 CatSelectExampleModule,
		 CatSelectModule,
		 InvoiceModule,
		 OrdersModule,
		 MatTabsModule,
		 NgxInputTagModule.forRoot(),
		 ContactUsModule,
		 CustomerLeadsModule,
		 NotificationListModule,
		 AngularFireModule.initializeApp(environment.firebase),
		 AngularFirestoreModule, // imports firebase/firestore, only needed for database features
		 AngularFireAuthModule, // imports firebase/auth, only needed for auth features
		UserPasswordModule,
		MyModalModule,
		DialogModalModule,
		NewArrivalsModule,
		ShareButtonsModule,
		BreadcrumbModule,
		CounterSectionModule,
		NgxBraintreeModule,
		AngularFireDatabaseModule,
    AngularFireMessagingModule,
	],
	declarations: [
		MetookeyAppComponent, 
		MainComponent,
		AuthComponent,
		HomeComponent,
		//ModalComponent,
		//LoginComponent,
		LoginoneComponent,
		ProfileEditComponent,
		// ProfileComponent
		//LoginoneComponent
		// RangePipe,
		// TimeAgoPipe
		NewOrderMobileComponent
		
		],
	entryComponents: [
		MyModalComponent,
		LoginoneComponent,
		RegisterComponent
	],
	bootstrap: [MetookeyAppComponent],
	providers:[
		MenuItems,
		BreadcrumbService,
		// PageTitleService
		SharedService,
		AuthService,
		CallapiService,
		AuthGuard,
		CookieService,
		ExcelService,
		PaypalService,
		AdminGuard,
		MetookeyerGuard,
		WindowService,
		GeneralModalService,
		FirebaseMessagesService,
		AsyncPipe
	],
	exports: [
		//ItemChartComponent
		//ModalComponent
		// TimeAgoPipe,
        // RangePipe
		
	]
})
export class MetookeyAppModule { }
