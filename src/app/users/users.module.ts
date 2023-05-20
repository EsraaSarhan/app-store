import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { AdminHomePageComponent } from './components/admin-home-page/admin-home-page.component';
import { UsersRoutingModule } from './users.routing.module.';



@NgModule({
  declarations: [
    AdminHomePageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
