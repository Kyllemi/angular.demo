import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductFormComponent } from './product-form/product-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsListComponent },
  { path: 'products/new', component: ProductFormComponent },
  { path: 'products/:id/edit', component: ProductFormComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
];