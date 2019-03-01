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
import { RecaptchaModule } from 'ng-recaptcha';
import { DialogModalModule } from 'app/dialog-modal/dialog-modal.module';

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
    DialogModalModule
    
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
  ]
})

export class SessionDemoModule {}
