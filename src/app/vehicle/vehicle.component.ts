import { Component, OnInit } from '@angular/core';
import {User} from "../entities/user";
import {Role} from "../entities/role";
import {BaseControl} from "../editor-form/base-control";
import {ApiService} from "../api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TextboxControl} from "../editor-form/textbox-control";
import {CheckboxControl} from "../editor-form/checkbox-control";
import {DropdownControl} from "../editor-form/dropdown-control";
import {Vehicle} from "../entities/vehicle";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
  public initialized = false;

  vehicle: Vehicle;
  users: User[] = [];

  controls: BaseControl<any>[] = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    this.initControls();
  }

  ngOnInit() {
    this.vehicle = new Vehicle();
    const id = this.route.snapshot.paramMap.get('id');
    this.apiService.getUsers(0, 20).then((users) => {
      this.users = users;
      this.initControls();
    });
    if (id !== 'add') {
      this.apiService.getVehicle(id).then((vehicle) => {
        this.vehicle = vehicle;
        this.initialized = true;
      });
    } else {
      this.initialized = true;
    }
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
