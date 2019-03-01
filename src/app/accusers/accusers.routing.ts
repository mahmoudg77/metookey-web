import { Routes } from '@angular/router';
import { AccusersComponent } from './accusers.component';

export const accusersRoutes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'accusers',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    component: AccusersComponent
    // children: [
    //   {
    //     path: 'accusers',
    //     component: AccusersComponent
    //   },
    //]
  }
];



