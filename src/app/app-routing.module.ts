import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: () => import(/* webpackChunkName: "Login" */'./main/main.module')
      .then(mod => mod.MainModule)
  },
  {
    path: 'ProductsList', loadChildren: () => import(/* webpackChunkName: "ProductsList" */'./products/products.module')
      .then(mod => mod.ProductsModule)
  },
  {
    path: 'Login', loadChildren: () => import(/* webpackChunkName: "Login" */'./main/main.module')
      .then(mod => mod.MainModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

