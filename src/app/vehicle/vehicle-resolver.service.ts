import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Vehicle} from "../entities/vehicle";
import {EMPTY, Observable, of} from "rxjs";
import {ApiService} from "../api.service";
import {mergeMap, take} from "rxjs/operators";
import {User} from "../entities/user";
import {PreloaderService} from "../preloader/preloader.service";

@Injectable({
  providedIn: 'root'
})
export class VehicleResolverService implements Resolve<Vehicle>{

  constructor(private router: Router, private preloaderService: PreloaderService, private apiService: ApiService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Vehicle> | Vehicle | Observable<never> {
    let id = route.paramMap.get('id');
    let p = null;
    if (id == 'add') {
      return new Vehicle();
    }

    let waitId = this.preloaderService.getWaitId();

    return new Observable<Vehicle>((s) => {
      this.apiService.getVehicle(id).then((r) => {
        s.next(r);
      });
    }).pipe(
      take(1),
      mergeMap(crisis => {
        this.preloaderService.removeWait(waitId);
        if (crisis) {
          return of(crisis);
        } else { // id not found
          this.router.navigate(['/vehicles']);
          return EMPTY;
        }
      })
    );
  }
}
