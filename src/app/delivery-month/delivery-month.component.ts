import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-delivery-month',
  templateUrl: './delivery-month.component.html',
  styleUrls: ['./delivery-month.component.scss']
})
export class DeliveryMonthComponent implements OnInit {

  currentDay: Date;
  previosMonth: Date;
  nextMonth: Date;
  calendarData: Date[][];

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    let year = this.route.snapshot.paramMap.get('year');
    let month = this.route.snapshot.paramMap.get('month');
    if (year && month) {
      this.currentDay = new Date(parseInt(year), parseInt(month));
    } else {
      this.currentDay = new Date();
    }
    this.initPreviosNext();
    this.initCalendarData();
  }

  initPreviosNext() {
    this.previosMonth = new Date(this.currentDay.getFullYear(), this.currentDay.getMonth()-1, 1);
    this.nextMonth = new Date(this.currentDay.getFullYear(), this.currentDay.getMonth()+1, 1);
    console.log(this.previosMonth);
    console.log(this.nextMonth);
  }

  initCalendarData() {
    this.calendarData = [];
    let row = [];
    let month = this.currentDay.getMonth();

    let monthFirstDay = new Date(this.currentDay.getFullYear(), this.currentDay.getMonth(), 1);
    if (this.getWeek().indexOf(monthFirstDay.getDay()) > 0) {
      for (let i = -this.getWeek().indexOf(monthFirstDay.getDay()); i < 0; i++) {
        row.push(new Date(monthFirstDay.getFullYear(), monthFirstDay.getMonth(), monthFirstDay.getDate() + i));
      }
    }

    let start = 0;
    let end = 7 - this.getWeek().indexOf(monthFirstDay.getDay());
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

  getWeek() {
    return [1, 2, 3, 4, 5, 6, 0];
  }

  isToday(date: Date) {
    let current = new Date();
    return date.getFullYear() == current.getFullYear() && date.getMonth() == current.getMonth() && date.getDate() == current.getDate();
  }

  isOtherMonth(date: Date) {
    return date.getMonth() != this.currentDay.getMonth();
  }

  isWeekend(date: Date | number) {
    let weekends = [6, 0];
    if (typeof date === "number") {
      return weekends.indexOf(date) != -1;
    }
    return weekends.indexOf(date.getDay()) != -1;
  }

  getDayName(day: number) {
    switch (day) {
      case 0:
        return "восскресенье";
      case 1:
        return "понедельник";
      case 2:
        return "вторник";
      case 3:
        return "среда";
      case 4:
        return "четверг";
      case 5:
        return "пятница";
      case 6:
        return "суббота";
    }
  }

  getDayShortName(day: number) {
    switch (day) {
      case 0:
        return "вc";
      case 1:
        return "пн";
      case 2:
        return "вт";
      case 3:
        return "ср";
      case 4:
        return "чт";
      case 5:
        return "пт";
      case 6:
        return "сб";
    }
  }

  getMonthName(month: number) {
    switch (month) {
      case 0:
        return "январь";
      case 1:
        return "февраль";
      case 2:
        return "март";
      case 3:
        return "апрель";
      case 4:
        return "май";
      case 5:
        return "июнь";
      case 6:
        return "июль";
      case 7:
        return "август";
      case 8:
        return "сентябрь";
      case 9:
        return "октябрь";
      case 10:
        return "ноябрь";
      case 11:
        return "декабрь";
    }
  }

  getMonthNameWithNumber(month: number) {
    switch (month) {
      case 0:
        return "января";
      case 1:
        return "февраля";
      case 2:
        return "марта";
      case 3:
        return "апреля";
      case 4:
        return "майя";
      case 5:
        return "июня";
      case 6:
        return "июля";
      case 7:
        return "августа";
      case 8:
        return "сентября";
      case 9:
        return "октября";
      case 10:
        return "ноября";
      case 11:
        return "декабря";
    }
  }
}
