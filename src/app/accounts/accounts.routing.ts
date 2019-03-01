//import { AccountsComponent } from './accounts.component';
import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';

export const AccountsRoutes: Routes = [
  // {
  //     path:'accounts',
  //     //redirectTo:'list',
  //     //pathMatch:'full',
  //     children:[
        {
          path: 'list',
          component: ListComponent,
          //outlet:"dashboard"
        },
        {
          path: 'edit/:id',
          component: EditComponent
        },
        {
          path: 'view/:id',
          component: ViewComponent
        },
       
    //   ]
    // } 
  ];
