import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './user/user.component';
import {RolesComponent} from "./roles/roles.component";
import {RoleComponent} from "./role/role.component";
import {VehicleComponent} from "./vehicle/vehicle.component";
import {VehiclesComponent} from "./vehicles/vehicles.component";
import {DeliveryMonthComponent} from "./delivery-month/delivery-month.component";
import {DeliveryDayComponent} from "./delivery-day/delivery-day.component";
import {DeliveryComponent} from "./delivery/delivery.component";
import {AppComponent} from "./app.component";
import {AuthGuard} from "./auth/auth.guard";
import {LoginComponent} from "../login/login.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'users/:id', component: UserComponent },
          { path: 'users', component: UsersComponent },
          { path: 'roles/:id', component: RoleComponent },
          { path: 'roles', component: RolesComponent },
          { path: 'vehicles/:id', component: VehicleComponent },
          { path: 'vehicles', component: VehiclesComponent },
          { path: 'delivery/day/:year/:month/:date', component: DeliveryDayComponent },
          { path: 'delivery/month/:year/:month', component: DeliveryMonthComponent },
          { path: 'delivery/month', component: DeliveryMonthComponent },
          { path: 'delivery/:id', component: DeliveryComponent },
          { path: '', component: UsersComponent },
        ],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
