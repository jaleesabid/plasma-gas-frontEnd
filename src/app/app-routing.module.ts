import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthComponent} from './_layouts/auth/auth.component';
import {AdminComponent} from './_layouts/admin/admin.component';
import {OrdersComponent} from './orders/orders.component';

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login', component: AuthComponent,
    children: [
      {path: '', component: LoginComponent}
    ]
  },
  {
    path: 'orders', component: AdminComponent,
    children: [
      {path: '', component: OrdersComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
