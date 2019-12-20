import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ApiService} from "../api.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {FormatterService} from "../formatter.service";
import {DeliveryType} from "../entities/delivery";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-delivery-calendar',
  templateUrl: './delivery-calendar.component.html',
  styleUrls: ['./delivery-calendar.component.scss']
})
export class DeliveryCalendarComponent implements OnInit, OnDestroy {
  @Input() public size: 'big' | 'small';
  @Input() public onDateClick: (date: Date) => void;
  public currentDay: Date;
  public previosMonth: Date;
  public nextMonth: Date;
  public calendarData: Date[][];
  public initialized = false;
  public months: Date[];
  public years: Date[];
  public countsByDate: {
    [index:string]:{
      1:number,
      2:number,
      3:number,
    }
  } = {};

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
      this.initCountsByDate();
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

  initCountsByDate() {
    const from = this.calendarData[0][0];
    const to = this.calendarData[this.calendarData.length - 1][this.calendarData[this.calendarData.length - 1].length - 1];
    this.apiService.getDeliveriesCountByDate(from, to).then((r) => {
      this.countsByDate = {};
      r.forEach((i) => {
        const datetime = new Date(Date.parse(i.datetime));
        const type = i.type;
        const date = datetime.getFullYear()+'-'+datetime.getMonth()+'-'+datetime.getDate();
        let d = this.countsByDate[date];
        if (!d) {
          d = {
            1:0,
            2:0,
            3:0,
          };
        }
        d[type] = i.count;
        this.countsByDate[date] = d;
      });
    });
  }

  dateClick(date: Date) {
    this.onDateClick(date);
  }

  isOtherMonth(date: Date) {
    return date.getMonth() != this.currentDay.getMonth();
  }

  getCountFirstPart(date: Date) {
    const sdate = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();
    return this.countsByDate[sdate]?this.countsByDate[sdate][DeliveryType.firstDayPart]:0;
  }

  getCountSecondPart(date: Date) {
    const sdate = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();
    return this.countsByDate[sdate]?this.countsByDate[sdate][DeliveryType.secondDayPart]:0;
  }

  getCountInternal(date: Date) {
    const sdate = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();
    return this.countsByDate[sdate]?this.countsByDate[sdate][DeliveryType.internalDelivery]:0;
  }

  getCount(date: Date) {
    return this.getCountFirstPart(date) + this.getCountSecondPart(date);
  }
}
