import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {FixedDelivery} from "../entities/fixed-delivery";
import {Subscription} from "rxjs";
import {ApiService} from "../api.service";
import {DeliveryType, DeliveryTypeNames} from "../entities/delivery";
import {User} from "../entities/user";
import {Role} from "../entities/role";
import {BaseControl} from "../editor-form/base-control";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {TextboxControl} from "../editor-form/textbox-control";
import {CheckboxControl} from "../editor-form/checkbox-control";
import {DropdownControl} from "../editor-form/dropdown-control";

@Component({
  selector: 'app-fixed-delivery',
  templateUrl: './fixed-delivery.component.html',
  styleUrls: ['./fixed-delivery.component.scss']
})
export class FixedDeliveryComponent implements OnInit,OnDestroy {
  public initialized = false;
  public fixedDelivery: FixedDelivery;

  public controls: BaseControl<any>[] = [];

  private routeSubscription: Subscription;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    this.initControls();
  }

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
      this.fixedDelivery = new FixedDelivery();
      const id = this.route.snapshot.paramMap.get('id');
      if (id !== 'add') {
        this.apiService.getFixedDelivery(id).then((fixedDelivery) => {
          this.fixedDelivery = fixedDelivery;
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

  save(fixedDelivery: FixedDelivery) {
    fixedDelivery.type = fixedDelivery.type * 1;
    if (fixedDelivery.id > 0) {
      this.apiService.updateFixedDelivery(fixedDelivery);
    } else {
      this.apiService.createFixedDelivery(fixedDelivery);
    }
    this.router.navigate(['/fixed-deliveries']);
    return false;
  }

  cancel() {
    this.router.navigate(['/fixed-deliveries']);
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
      key: 'name',
      type: 'text',
      label: 'Наименование',
    }));
    const options = [];
    for (let type in DeliveryType) {
      options.push({
        key: type,
        value: DeliveryTypeNames[type],
      });
    }
    this.controls.push(new DropdownControl({
      key: 'type',
      label: 'Тип',
      options,
    }));
    this.controls.push(new CheckboxControl({
      key: 'd1',
      label: 'Понедельник',
    }));
    this.controls.push(new CheckboxControl({
      key: 'd2',
      label: 'Вторник',
    }));
    this.controls.push(new CheckboxControl({
      key: 'd3',
      label: 'Среда',
    }));
    this.controls.push(new CheckboxControl({
      key: 'd4',
      label: 'Четверг',
    }));
    this.controls.push(new CheckboxControl({
      key: 'd5',
      label: 'Пятница',
    }));
    this.controls.push(new CheckboxControl({
      key: 'd6',
      label: 'Суббота',
    }));
    this.controls.push(new CheckboxControl({
      key: 'd7',
      label: 'Воскресенье',
    }));
  }
}
