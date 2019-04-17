import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from './../modal/modal.module';
import { LogoutModule } from './logout/logout.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { LockScreenComponent } from './lockscreen/lockscreen.component';
import { SubscribesComponent } from './subscribes/subscribes.component';
import { UnderMaintanceComponent } from './under-maintance/under-maintance.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SessionRoutes } from './session.routing';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { DialogModalModule } from 'app/dialog-modal/dialog-modal.module';
import { environment } from 'environments/environment.prod';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(SessionRoutes),
    LogoutModule,
    ModalModule,
    TranslateModule,
    ReactiveFormsModule,
    PasswordStrengthMeterModule,
    RecaptchaModule,
    DialogModalModule,
    RecaptchaFormsModule
    
  ],
  declarations: [ 
    //LoginoneComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ComingSoonComponent,
    LockScreenComponent,
    SubscribesComponent,
    UnderMaintanceComponent,
    NotFoundComponent,
    NewpasswordComponent,
    //LoginComponent
  ],
  providers:[
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: "6Lc77YQUAAAAAF_R5BmIcw3tCVIqsuKi4cNm-uGN",//6LdLDJcUAAAAAODI97mdVSHYnq5lRZXoXm1iea-k
      } as RecaptchaSettings,
    },
  ]
})

export class SessionDemoModule {}
