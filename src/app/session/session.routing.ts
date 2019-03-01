import { MainComponent } from '../main/main.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { Routes } from '@angular/router';

import { LoginoneComponent } from './loginone/loginone.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { LockScreenComponent } from './lockscreen/lockscreen.component';
import { SubscribesComponent } from './subscribes/subscribes.component';
import { UnderMaintanceComponent } from './under-maintance/under-maintance.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const SessionRoutes: Routes = [
    // {
    //   path: '',
    //   component: LoginoneComponent
    // },
    {
      path: 'login',
      component: LoginoneComponent
    },
    {
      path: 'logout',
      component: LogoutComponent
    },
    {
      path: 'register',
      component: RegisterComponent
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
    // {
    //   path: '**',
    //   component: LoginoneComponent
    // },
    // {
    //   path: 'coming-soon',
    //   component: ComingSoonComponent
    // },
    // {
    //   path: 'lockscreen',
    //   component: LockScreenComponent
    // },
    // {
    //   path: 'not-found',
    //   component: NotFoundComponent
    // },
    // {
    //   path: 'subscribes',
    //   component: SubscribesComponent
    // },
    // {
    //   path: 'undermaintance',
    //   component: UnderMaintanceComponent
    // },

];

  


