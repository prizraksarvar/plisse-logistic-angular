import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Vehicle} from "../entities/vehicle";
import {FixedDelivery} from "../entities/fixed-delivery";
import {PreloaderService} from "../preloader/preloader.service";
import {ApiService} from "../api.service";
import {EMPTY, Observable, of} from "rxjs";
import {mergeMap, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FixedDeliveriesResolverService implements Resolve<FixedDelivery[]> {

  constructor(private router: Router, private preloaderService: PreloaderService, private apiService: ApiService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FixedDelivery[]> | Promise<FixedDelivery[]> | FixedDelivery[] | Observable<never> {
    let waitId = this.preloaderService.getWaitId();

    return new Observable<FixedDelivery[]>((s) => {
      this.apiService.getFixedDeliveries(0,1000).then((r) => {
        s.next(r);
      });
    }).pipe(
      take(1),
      mergeMap(items => {
        this.preloaderService.removeWait(waitId);
        if (items) {
          return of(items);
        } else { // id not found
          this.router.navigate(['/fixed-deliveries']);
          return EMPTY;
        }
      })
    );
  }
}
