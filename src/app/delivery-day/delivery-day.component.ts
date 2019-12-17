import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {ApiService} from "../api.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {FormatterService} from "../formatter.service";
import {Delivery} from "../entities/delivery";
import {TableAction} from "../entities/table-action";

@Component({
  selector: 'app-delivery-day',
  templateUrl: './delivery-day.component.html',
  styleUrls: ['./delivery-day.component.scss']
})
export class DeliveryDayComponent implements OnInit, OnDestroy {
  @Input() routeLink:string;
  @Input() editDisabled:boolean;
  @Input() addDisabled:boolean;
  @Input() additionalActions: TableAction[];
  @Output() change: EventEmitter<void> = new EventEmitter<void>();
  public initialized = false;
  public currentDay: Date;
  public previosDate: Date;
  public nextDate: Date;

  private routeSubscription: Subscription;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    public formatterService: FormatterService
  ) {
  }

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
      this.initialized = false;
      let year = params.get('year');
      let month = params.get('month');
      let date = params.get('date');
      this.currentDay = new Date(parseInt(year), parseInt(month), parseInt(date));
      this.initTable();
      this.initPreviosNext();
      this.initialized = true;
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  initTable() {

  }

  initPreviosNext() {
    this.previosDate = new Date(this.currentDay.getFullYear(), this.currentDay.getMonth(), this.currentDay.getDate() - 1);
    this.nextDate = new Date(this.currentDay.getFullYear(), this.currentDay.getMonth(), this.currentDay.getDate() + 1);
  }

}
