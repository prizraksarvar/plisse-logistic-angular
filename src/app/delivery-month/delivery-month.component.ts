import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Subscription} from "rxjs";
import {FormatterService} from "../formatter.service";

@Component({
  selector: 'app-delivery-month',
  templateUrl: './delivery-month.component.html',
  styleUrls: ['./delivery-month.component.scss']
})
export class DeliveryMonthComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  dateClick(date:Date) {
    this.router.navigate(['/delivery/day',date.getFullYear(),date.getMonth(),date.getDate()]);
  }
}
