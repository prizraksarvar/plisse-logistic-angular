import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Subscription} from "rxjs";
import {FormatterService} from "../formatter.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-delivery-month',
  templateUrl: './delivery-month.component.html',
  styleUrls: ['./delivery-month.component.scss']
})
export class DeliveryMonthComponent implements OnInit, OnDestroy {
  private routeLink = "";
  private userSubscription: Subscription;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      if (user==null) {
        this.routeLink = "";
      } else if (user.roleId==1 || user.roleId==2) {
        this.routeLink = "/delivery/day";
      } else if (user.roleId==3) {
        this.routeLink = "/manager/delivery/day";
      } else if (user.roleId==4) {
        this.routeLink = "/driver/delivery/day";
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  dateClick(date:Date) {
    this.router.navigate([this.routeLink,date.getFullYear(),date.getMonth(),date.getDate()]);
  }
}
