import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-delivery-day-manager',
  templateUrl: './delivery-day-manager.component.html',
  styleUrls: ['./delivery-day-manager.component.scss']
})
export class DeliveryDayManagerComponent implements OnInit, OnDestroy {
  public initialized = false;
  public currentDay: Date;

  private routeSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
      this.initialized = false;
      let year = params.get('year');
      let month = params.get('month');
      let date = params.get('date');
      this.currentDay = new Date(parseInt(year), parseInt(month), parseInt(date));
      this.initialized = true;
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  changed() {
    this.initialized = false;
    setTimeout(()=>{
      this.initialized = true;
    },100);
  }

}
