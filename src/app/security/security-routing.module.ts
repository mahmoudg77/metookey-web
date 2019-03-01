import { ModalModule } from './../modal/modal.module';
import { UserRoleComponent } from './user-role/user-role.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../core/guard/auth.guard';
import { RolesComponent } from './roles/roles.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'roles',
  //   pathMatch: 'full',
  // },
  {
    path: 'roles',
    component: RolesComponent,
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ModalModule,
    TranslateModule
  ],
  declarations:[
        RolesComponent,
        UserRoleComponent
  ],
  exports: [
     RolesComponent,
     UserRoleComponent
  ]
})
export class SecurityModule { }
