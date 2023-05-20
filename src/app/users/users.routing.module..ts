import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminHomePageComponent } from './components/admin-home-page/admin-home-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'prefix', component: AdminHomePageComponent },
   { path: 'Admin', pathMatch: 'prefix', component: AdminHomePageComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
