import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../entities/user";
import {Role} from "../entities/role";
import {BaseControl} from "../editor-form/base-control";
import {ApiService} from "../api.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {TextboxControl} from "../editor-form/textbox-control";
import {CheckboxControl} from "../editor-form/checkbox-control";
import {DropdownControl} from "../editor-form/dropdown-control";
import {Vehicle} from "../entities/vehicle";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit, OnDestroy {
  public initialized = false;

  public vehicle: Vehicle;
  public users: User[] = [];

  public controls: BaseControl<any>[] = [];
  private routeSubscription: Subscription;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    this.initControls();
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { vehicle: Vehicle, users: User[] }) => {
        this.vehicle = data.vehicle;
        this.users = data.users;
        this.initControls();
        this.initialized = true;
      });
  }

  ngOnDestroy(): void {

  }

  save(vehicle: Vehicle) {
    if (vehicle.id > 0) {
      this.apiService.updateVehicle(vehicle);
    } else {
      this.apiService.createVehicle(vehicle);
    }
    this.router.navigate(['/vehicles']);
    return false;
  }

  cancel() {
    this.router.navigate(['/vehicles']);
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
    this.controls.push(new CheckboxControl({
      key: 'active',
      label: 'Активен',
    }));
    this.controls.push(new TextboxControl({
      key: 'name',
      type: 'text',
      label: 'Название',
    }));
    const options = [];
    this.users.forEach((item) => {
      options.push({
        key: item.id,
        value: item.firstName + ' ' + item.lastName,
      });
    });
    this.controls.push(new DropdownControl({
      key: 'userId',
      label: 'Водитель',
      options,
    }));
  }
}
