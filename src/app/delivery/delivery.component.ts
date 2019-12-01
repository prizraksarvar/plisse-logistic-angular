import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Delivery} from '../entities/delivery';
import {BaseControl} from '../editor-form/base-control';
import {TextboxControl} from '../editor-form/textbox-control';
import {CheckboxControl} from '../editor-form/checkbox-control';
import {PhoneControlMask} from '../editor-form/masks/phone-control-mask';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit, OnDestroy {
  public initialized = false;
  public delivery: Delivery;

  public controls: BaseControl<any>[] = [];
  public currentDay: Date;
  public dayPart = 1;

  private routeSubscription: Subscription;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    // this.initControls();
  }

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
      this.delivery = new Delivery();
      const id = params.get('id');
      let year = params.get('year');
      let month = params.get('month');
      let date = params.get('date');
      if (year && month && date) {
        this.currentDay = new Date(parseInt(year), parseInt(month), parseInt(date));
      } else {
        this.currentDay = new Date();
        this.currentDay.setHours(0,0,0,0);
      }
      const dayPart = params.get('dayPart');
      this.initControls();
      if (dayPart) {
        this.dayPart = parseInt(dayPart);
      }
      if (this.dayPart==2) {
        this.currentDay.setHours(4);
      }
      if (id !== 'add') {
        this.apiService.getDelivery(id).then((delivery) => {
          this.delivery = delivery;
          this.initialized = true;
        });
      } else {
        this.initialized = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  save(delivery: Delivery) {
    delivery.dateTime = this.currentDay;
    if (delivery.id > 0) {
      this.apiService.updateDelivery(delivery);
    } else {
      this.apiService.createDelivery(delivery);
    }
    this.router.navigate(['/delivery/day', this.currentDay.getFullYear(), this.currentDay.getMonth(), this.currentDay.getDate()]);
    return false;
  }

  cancel() {
    this.router.navigate(['/delivery/day', this.currentDay.getFullYear(), this.currentDay.getMonth(), this.currentDay.getDate()]);
    return false;
  }

  private initControls() {
    this.controls = [];
    this.controls.push(new TextboxControl({
      key: 'id',
      type: 'text',
      label: 'ИД',
      disabled: true,
    }));
    this.controls.push(new TextboxControl({
      key: 'organization',
      type: 'text',
      label: 'Организация',
    }));
    this.controls.push(new TextboxControl({
      key: 'address',
      type: 'text',
      label: 'Адрес',
    }));
    this.controls.push(new TextboxControl({
      key: 'phone',
      type: 'text',
      label: 'телефон',
      mask: new PhoneControlMask(),
    }));
    this.controls.push(new TextboxControl({
      key: 'recipientName',
      type: 'text',
      label: 'Получатель',
    }));
    this.controls.push(new TextboxControl({
      key: 'comment',
      type: 'text',
      label: 'Коментарий',
    }));
    this.controls.push(new TextboxControl({
      key: 'dateTime',
      type: 'text',
      label: 'Дата',
      disabled: true,
    }));
    this.controls.push(new TextboxControl({
      key: 'createdTime',
      type: 'text',
      label: 'Дата создания',
      disabled: true,
    }));
    this.controls.push(new TextboxControl({
      key: 'vehicleAssignTime',
      type: 'text',
      label: 'Время назначения машины',
      disabled: true,
    }));
    this.controls.push(new TextboxControl({
      key: 'completedTime',
      type: 'text',
      label: 'Время завершения',
      disabled: true,
    }));
    this.controls.push(new CheckboxControl({
      key: 'completed',
      label: 'Завершено',
      disabled: true,
    }));
    this.controls.push(new TextboxControl({
      key: 'createrUserId',
      type: 'text',
      label: 'Создатель доставки',
      disabled: true,
    }));
  }
}
