import { Component, OnInit } from '@angular/core';
import {AuthService} from "../app/auth/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login = new FormControl();
  password = new FormControl();
  form:FormGroup;

  constructor(private authService:AuthService, private router:Router) {
    this.form = new FormGroup({login: this.login, password: this.password});
  }

  ngOnInit() {

  }

  loginStateSwitch() {
    if (this.logged) {
      this.authService.logout();
    }
    else {
      this.authService.login({
        login: this.login.value,
        password: this.password.value
      }).then((r) => {
        console.log(r);
        if (r) {
          if (this.authService.redirectUrl) {
            this.router.navigate([this.authService.redirectUrl]);
          } else {
            this.router.navigate(['']);
          }
        }
      }).catch((e) => {
        alert(e.error.error.message);
      });
    }
  }

  get logged():boolean {
    return this.authService.isLoggedIn;
  }
}
