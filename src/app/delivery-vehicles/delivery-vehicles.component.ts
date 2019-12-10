import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {Vehicle} from "../entities/vehicle";

@Component({
  selector: 'app-delivery-vehicles',
  templateUrl: './delivery-vehicles.component.html',
  styleUrls: ['./delivery-vehicles.component.scss']
})
export class DeliveryVehiclesComponent implements OnInit {

  public vehicles:Vehicle[];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getVehicles(0, 100).then((vehicles) => {
      this.vehicles = vehicles;
    });
  }

}
