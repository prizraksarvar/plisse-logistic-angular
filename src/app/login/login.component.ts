import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {PreloaderService} from "../preloader/preloader.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login = new FormControl();
  password = new FormControl();
  form:FormGroup;

  constructor(private authService:AuthService, private router:Router, private preloaderService: PreloaderService) {
    this.form = new FormGroup({login: this.login, password: this.password});
  }

  ngOnInit() {
    this.preloaderService.wrapPreloader(this.authService.checkAuth()).then((r) => {
      this.returnToAdmin(r);
    });
  }

  loginStateSwitch() {
    if (this.logged) {
      this.authService.logout();
    }
    else {
      this.preloaderService.wrapPreloader(this.authService.login({
        login: this.login.value,
        password: this.password.value
      })).then((r) => {
        console.log(r);
        this.returnToAdmin(r);
      }).catch((e) => {
        alert(e.error.error.message);
      });
    }
  }

  get logged():boolean {
    return this.authService.isLoggedIn;
  }

  private returnToAdmin(r:boolean) {
    if (r) {
      if (this.authService.redirectUrl) {
        this.router.navigate([this.authService.redirectUrl]);
      } else {
        this.router.navigate(['']);
      }
    }
  }
}
