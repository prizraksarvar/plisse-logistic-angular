import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {User} from "../entities/user";
import {EMPTY, Observable, of} from "rxjs";
import {Vehicle} from "../entities/vehicle";
import {ApiService} from "../api.service";
import {mergeMap, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersResolverService implements Resolve<User[]>{

  constructor(private router: Router, private apiService: ApiService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> | Observable<never> {
    return new Observable<User[]>((s) => {
      this.apiService.getUsers(0, 20).then((r) => {
        s.next(r);
      });
    }).pipe(
      take(1),
      mergeMap(crisis => {
        return of(crisis);
      })
    );
  }
}
