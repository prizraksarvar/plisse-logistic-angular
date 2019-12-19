import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Subscription} from "rxjs";
import {ApiService} from "../api.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-delivery-day-logistic',
  templateUrl: './delivery-day-logistic.component.html',
  styleUrls: ['./delivery-day-logistic.component.scss']
})
export class DeliveryDayLogisticComponent implements OnInit, OnDestroy {
  public initialized = false;
  public currentDay: Date;

  private routeSubscription: Subscription;
  private checkerTimer;
  private maxId = 0;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
      this.initialized = false;
      let year = params.get('year');
      let month = params.get('month');
      let date = params.get('date');
      this.currentDay = new Date(parseInt(year), parseInt(month), parseInt(date));
      this.initialized = true;
    });
    this.checkerTimer = setInterval(this.checkUpdates.bind(this), 2000);
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    clearInterval(this.checkerTimer);
  }

  changed() {
    this.initialized = false;
    setTimeout(() => {
      this.initialized = true;
    }, 100);
  }

  private checkUpdates() {
    if (!this.initialized) return;
    let date = new Date();
    date.setHours(0,0,0,0);
    this.apiService.getDeliveries(0, 100, date).then((deliveries) => {
      let max = 0;
      deliveries.forEach((d) => {
        if (d.id > max) max = d.id;
      });
      if (this.maxId == 0) {
        if (max>0) {
          this.maxId = max;
        } else {
          this.maxId = 1;
        }
        return;
      }
      if (this.maxId==max) {
        return;
      }

      this.maxId = max;

      this.snackBar.open("Добавлены новые доставки на сегодня", "Ок", {
        duration: 5000,
      });
    });
  }
}
