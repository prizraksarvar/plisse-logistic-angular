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
  MatCardModule, MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule, MatSelectModule,
  MatTableModule,
  MatIconModule,
  MatToolbarModule,
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
    RoleComponent
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
  ],
  providers: [
    ApiService,
    FormControlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
