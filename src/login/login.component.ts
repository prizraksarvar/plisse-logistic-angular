import { Component, OnInit } from '@angular/core';
import {AuthService} from "../app/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
  }

  loginStateSwitch() {
    if (this.logged) {
      this.authService.logout();
    }
    else {
      this.authService.login().subscribe((r) => {
        console.log(r);
        if (r) {
          if (this.authService.redirectUrl) {
            this.router.navigate([this.authService.redirectUrl]);
          } else {
            this.router.navigate(['']);
          }
        }
      });
    }
  }

  get logged():boolean {
    return this.authService.isLoggedIn;
  }
}
