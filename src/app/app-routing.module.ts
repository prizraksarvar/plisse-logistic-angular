import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
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
import {VehicleResolverService} from "./vehicle/vehicle-resolver.service";
import {UsersResolverService} from "./vehicle/users-resolver.service";
import {DeliveryDayLogisticComponent} from "./delivery-day-logistic/delivery-day-logistic.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          {path: 'users/:id', component: UserComponent, data: {roles: [1], animation: 'detail'}},
          {path: 'users', component: UsersComponent, data: {roles: [1], animation: 'list'}},
          {path: 'roles/:id', component: RoleComponent, data: {roles: [1], animation: 'detail'}},
          {path: 'roles', component: RolesComponent, data: {roles: [1], animation: 'list'}},
          {
            path: 'vehicles/:id', component: VehicleComponent, data: {roles: [1, 2], animation: 'detail'}, resolve: {
              vehicle: VehicleResolverService,
              users: UsersResolverService
            }
          },
          {path: 'vehicles', component: VehiclesComponent, data: {roles: [1, 2], animation: 'list'}},
          {
            path: 'delivery/day/:year/:month/:date',
            component: DeliveryDayLogisticComponent,
            data: {roles: [1, 2, 3, 4], animation: 'list'}
          },
          {
            path: 'delivery/month/:year/:month',
            component: DeliveryMonthComponent,
            data: {roles: [1, 2, 3, 4], animation: 'list'}
          },
          {path: 'delivery/month', component: DeliveryMonthComponent, data: {roles: [1, 2, 3, 4], animation: 'list'}},
          {
            path: 'delivery/:id/:year/:month/:date/:dayPart',
            component: DeliveryComponent,
            data: {roles: [1, 2, 3, 4], animation: 'detail'}
          },
          {path: 'delivery/:id', component: DeliveryComponent, data: {roles: [1, 2, 3, 4], animation: 'detail'}},
          {path: '', component: DeliveryMonthComponent, data: {roles: [1, 2, 3, 4], animation: 'list'}},
        ],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
