import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './user/user.component';
import {RolesComponent} from "./roles/roles.component";
import {RoleComponent} from "./role/role.component";
import {VehicleComponent} from "./vehicle/vehicle.component";
import {VehiclesComponent} from "./vehicles/vehicles.component";


const routes: Routes = [
  { path: 'users/:id', component: UserComponent },
  { path: 'users', component: UsersComponent },
  { path: 'roles/:id', component: RoleComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'vehicles/:id', component: VehicleComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: '', component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
