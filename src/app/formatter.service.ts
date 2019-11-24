import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {

  constructor() { }

  getWeek() {
    return [1, 2, 3, 4, 5, 6, 0];
  }

  isToday(date: Date) {
    let current = new Date();
    return date.getFullYear() == current.getFullYear() && date.getMonth() == current.getMonth() && date.getDate() == current.getDate();
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
