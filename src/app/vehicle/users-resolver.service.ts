import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {User} from "../entities/user";
import {EMPTY, Observable, of} from "rxjs";
import {ApiService} from "../api.service";
import {mergeMap, take} from "rxjs/operators";
import {PreloaderService} from "../preloader/preloader.service";

@Injectable({
  providedIn: 'root'
})
export class UsersResolverService implements Resolve<User[]>{

  constructor(private router: Router, private preloaderService: PreloaderService, private apiService: ApiService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> | Observable<never> {
    let waitId = this.preloaderService.getWaitId();
    return new Observable<User[]>((s) => {
      this.apiService.getUsers(0, 20).then((r) => {
        s.next(r);
      });
    }).pipe(
      take(1),
      mergeMap(crisis => {
        this.preloaderService.removeWait(waitId);
        return of(crisis);
      })
    );
  }
}
