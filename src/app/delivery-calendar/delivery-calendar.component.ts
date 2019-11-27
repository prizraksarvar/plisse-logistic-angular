import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ApiService} from "../api.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {FormatterService} from "../formatter.service";

@Component({
  selector: 'app-delivery-calendar',
  templateUrl: './delivery-calendar.component.html',
  styleUrls: ['./delivery-calendar.component.scss']
})
export class DeliveryCalendarComponent implements OnInit, OnDestroy {
  @Input() public size: 'big'|'small';
  public currentDay: Date;
  public previosMonth: Date;
  public nextMonth: Date;
  public calendarData: Date[][];
  public initialized = false;
  public months: Date[];
  public years: Date[];

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
      console.log(year, month);
      if (year && month) {
        this.currentDay = new Date(parseInt(year), parseInt(month));
      } else {
        this.currentDay = new Date();
      }
      this.initPreviosNext();
      this.initCalendarData();
      this.initMonths();
      this.initYears();
      this.initialized = true;
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  initMonths() {
    this.months = [];
    for (let i = 0; i < 12; i++) {
      this.months.push(new Date(this.currentDay.getFullYear(), i, 1));
    }
  }

  initYears() {
    this.years = [];
    for (let i = -4; i < 4; i++) {
      this.years.push(new Date(this.currentDay.getFullYear() + i, this.currentDay.getMonth(), 1));
    }
  }

  initPreviosNext() {
    this.previosMonth = new Date(this.currentDay.getFullYear(), this.currentDay.getMonth() - 1, 1);
    this.nextMonth = new Date(this.currentDay.getFullYear(), this.currentDay.getMonth() + 1, 1);
  }

  initCalendarData() {
    this.calendarData = [];
    let row = [];
    let month = this.currentDay.getMonth();

    let monthFirstDay = new Date(this.currentDay.getFullYear(), this.currentDay.getMonth(), 1);
    if (this.formatterService.getWeek().indexOf(monthFirstDay.getDay()) > 0) {
      for (let i = -this.formatterService.getWeek().indexOf(monthFirstDay.getDay()); i < 0; i++) {
        row.push(new Date(monthFirstDay.getFullYear(), monthFirstDay.getMonth(), monthFirstDay.getDate() + i));
      }
    }

    let start = 0;
    let end = 7 - this.formatterService.getWeek().indexOf(monthFirstDay.getDay());
    let nextMonthStarted = false;
    while (!nextMonthStarted) {
      for (let i = start; i < end; i++) {
        let date = new Date(monthFirstDay.getFullYear(), monthFirstDay.getMonth(), monthFirstDay.getDate() + i);
        row.push(date);
        if (!nextMonthStarted && date.getMonth() != month) {
          nextMonthStarted = true;
        }
      }
      this.calendarData.push(row);
      row = [];
      start = end;
      end += 7;
    }
  }

  isOtherMonth(date: Date) {
    return date.getMonth() != this.currentDay.getMonth();
  }

  getCountFirstPart(date: Date) {
    return Math.floor(Math.random() * 5);
  }

  getCountSecondPart(date: Date) {
    return Math.floor(Math.random() * 5);
  }

  getCount(date: Date) {
    return this.getCountFirstPart(date) + this.getCountSecondPart(date);
  }
}
