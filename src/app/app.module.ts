import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import { DrawerComponent } from './drawer/drawer.component';
import { HeaderComponent } from './header/header.component';
import {
  MatButtonModule,
  MatBadgeModule,
  MatTooltipModule,
  MatCardModule, MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule, MatSelectModule,
  MatTableModule,
  MatIconModule,
  MatToolbarModule, MatMenuModule, MatProgressSpinnerModule,
} from '@angular/material';
import {ApiService} from './api.service';
import {HttpClientModule} from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { EditorFormComponent } from './editor-form/editor-form.component';
import { FormControlService } from './form-control.service';
import { ControlMaskDirective } from './editor-form/control-mask.directive';
import {ReactiveFormsModule} from "@angular/forms";
import { RolesComponent } from './roles/roles.component';
import { RoleComponent } from './role/role.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { DeliveryMonthComponent } from './delivery-month/delivery-month.component';
import { DeliveryDayComponent } from './delivery-day/delivery-day.component';
import {FormatterService} from "./formatter.service";
import { DeliveryCalendarComponent } from './delivery-calendar/delivery-calendar.component';
import { DeliveryComponent } from './delivery/delivery.component';
import {LoginModule} from "../login/login.module";
import {AuthService} from "./auth/auth.service";
import {LoginComponent} from "../login/login.component";
import { DeliveryTableComponent } from './delivery-table/delivery-table.component';
import { DeliveryDayLogisticComponent } from './delivery-day-logistic/delivery-day-logistic.component';
import { DeliveryVehiclesComponent } from './delivery-vehicles/delivery-vehicles.component';
import {PreloaderComponent} from "./preloader/preloader.component";
import {PreloaderService} from "./preloader/preloader.service";

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    DrawerComponent,
    HeaderComponent,
    UserComponent,
    EditorFormComponent,
    ControlMaskDirective,
    RolesComponent,
    RoleComponent,
    VehicleComponent,
    VehiclesComponent,
    DeliveryMonthComponent,
    DeliveryDayComponent,
    DeliveryCalendarComponent,
    DeliveryComponent,
    LoginComponent,
    DeliveryTableComponent,
    DeliveryDayLogisticComponent,
    DeliveryVehiclesComponent,
    PreloaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatTableModule,
    MatListModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatBadgeModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    // LoginModule,
  ],
  providers: [
    ApiService,
    FormControlService,
    FormatterService,
    AuthService,
    PreloaderService
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
