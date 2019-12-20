import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {delay, mergeMap, take, tap} from "rxjs/operators";
import {ApiService} from "../api.service";
import {User} from "../entities/user";
import {fromPromise} from "rxjs/internal-compatibility";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  redirectUrl: string;

  constructor(private apiService: ApiService, private router: Router) { }

  async login(data: Credentials): Promise<boolean> {
    let r = await this.apiService.login(data);
    window.localStorage.setItem("auth_token", r.token);
    return await this.checkAuth();
  }

  async checkAuth():Promise<boolean> {
    let token = window.localStorage.getItem("auth_token");
    if (token) {
      try {
        let user = await this.apiService.getUserProfile();
        if (user && user.id>0) {
          this.user.next(user);
          this.isLoggedIn = true;
          return true;
        }
      } catch (e) {

      }
    }
    return false;
  }

  logout(): void {
    window.localStorage.setItem("auth_token", null);
    this.isLoggedIn = false;
    this.user.next(null);
    this.redirectUrl = '/';
    this.router.navigate(['/login']);
  }
}

export class Credentials {
  login: string;
  password: string;
}
