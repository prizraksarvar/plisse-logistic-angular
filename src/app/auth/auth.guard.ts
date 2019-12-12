import {Injectable} from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('AuthGuard#canActivate called', state.url);

    return this.checkLogin(state.url, next.data.roles);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('AuthGuard#canActivateChild called', state.url);
    return this.checkLogin(state.url, next.data.roles);
  }

  checkLogin(url: string, roles: number[]): boolean {
    if (this.authService.isLoggedIn) {
      if (!roles || roles.indexOf(this.authService.user.getValue().roleId) != -1) {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;
    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}
