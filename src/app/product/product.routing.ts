import { AdminGuard } from './../core/guard/admin.guard';
import { AuthGuard } from './../core/guard/auth.guard';
import { Routes } from '@angular/router';
import { ListProductComponent } from './list-product/list.component';
import { ProductDetailsComponent } from './product-details/details.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { MetookeyerGuard } from 'app/core/guard/metookeyer.guard';

export const ProductRoutes: Routes = [
  {
    path: 'product',
    children:[
            {
                path: '',
                redirectTo:'my-products',
                pathMatch:'full'
            },
            {
              path: 'my-products',
              component: ListProductComponent,
              canActivate:[AuthGuard,MetookeyerGuard]
            },
            {
              path: 'my-favorite',
              component: ListProductComponent
            },
            {
              path: 'list',
              component: ListProductComponent,
              canActivate:[AuthGuard,AdminGuard]

            },
            {
              path: 'details/:id',
              component: ProductDetailsComponent
            },
            {
              path: 'new',
              component: EditProductComponent,
              canActivate:[AuthGuard,MetookeyerGuard]
            },
            {
              path: 'edit/:id',
              component: EditProductComponent,
              canActivate:[AuthGuard,MetookeyerGuard]
            },
  ]
  }  
];