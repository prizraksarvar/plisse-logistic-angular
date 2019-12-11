import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {delay, mergeMap, take, tap} from "rxjs/operators";
import {ApiService} from "../api.service";
import {User} from "../entities/user";
import {fromPromise} from "rxjs/internal-compatibility";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  user: User;
  redirectUrl: string;

  constructor(private apiService: ApiService) { }

  async login(data: Credentials): Promise<boolean> {
    let r = await this.apiService.login(data);
    window.localStorage.setItem("auth_token", r.token);
    this.isLoggedIn = !!r.token;
    return this.isLoggedIn;
  }

  async checkAuth() {
    let token = window.localStorage.getItem("auth_token");
    if (token) {

    }
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}

export class Credentials {
  login: string;
  password: string;
}
