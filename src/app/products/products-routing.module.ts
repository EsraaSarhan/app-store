import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsListComponent } from './components/products-list/products-list.component'

const routes: Routes = [
  { path: '', pathMatch: 'prefix', component: ProductsListComponent },
  { path: 'shopping-cart', pathMatch: 'prefix', component: ProductsListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
