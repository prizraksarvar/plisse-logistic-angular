import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {TableAction} from "../entities/table-action";
import {Delivery} from "../entities/delivery";
import {ApiService} from "../api.service";
import {PreloaderService} from "../preloader/preloader.service";

@Component({
  selector: 'app-delivery-day-driver',
  templateUrl: './delivery-day-driver.component.html',
  styleUrls: ['./delivery-day-driver.component.scss']
})
export class DeliveryDayDriverComponent implements OnInit, OnDestroy {
  public initialized = false;
  public currentDay: Date;
  public additionalActions: TableAction[] = [
    new TableAction("done", this.complete.bind(this), this.completeAvaible.bind(this))
  ];

  private routeSubscription: Subscription;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private preloaderService: PreloaderService) {
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
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  changed() {
    this.initialized = false;
    setTimeout(() => {
      this.initialized = true;
    }, 100);
  }

  complete(id: number) {
    this.initialized = false;
    this.preloaderService.wrapPreloader(this.apiService.updateDelivery({
      id: id,
      completed: true
    } as Delivery)).then((delivery) => {

    }).catch((e)=>{
      alert(e.error.error.message);
    }).finally(() => {
      this.initialized = true;
    });
    return false;
  }

  completeAvaible(element: Delivery) {
    return !element.completed;

  }
}
