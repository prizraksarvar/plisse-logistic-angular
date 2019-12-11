import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {Vehicle} from "../entities/vehicle";
import {PreloaderService} from "../preloader/preloader.service";
import {Delivery} from "../entities/delivery";

@Component({
  selector: 'app-delivery-vehicles',
  templateUrl: './delivery-vehicles.component.html',
  styleUrls: ['./delivery-vehicles.component.scss']
})
export class DeliveryVehiclesComponent implements OnInit, OnChanges {
  @Input() date: Date;
  initialized = false;
  vehicles: Vehicle[];
  deliveriesFirstPart: Delivery[] = [];
  deliveriesSecondPart: Delivery[] = [];

  constructor(private apiService: ApiService, private preloaderService: PreloaderService) {
  }

  ngOnInit() {
    this.apiService.getVehicles(0, 100).then((vehicles) => {
      this.vehicles = vehicles;
    });
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.initialized = false;
    let firstPartDate = new Date(this.date);
    let secondPartDate = new Date(this.date);
    secondPartDate.setHours(secondPartDate.getHours() + 4);
    this.preloaderService
      .wrapPreloader(Promise.all([this.apiService.getDeliveries(0, 100, firstPartDate)
        .then((deliveries) => {
          this.deliveriesFirstPart = deliveries;
        }),
        this.apiService.getDeliveries(0, 100, secondPartDate)
          .then((deliveries) => {
            this.deliveriesSecondPart = deliveries;
          })])).then(() => {
      this.initialized = true;
    });
  }

  getFirstPartDeliveries(vehicleId: number) {
    return this.deliveriesFirstPart.filter((d) => d.vehicleId == vehicleId);
  }

  getSecondPartDeliveries(vehicleId: number) {
    return this.deliveriesSecondPart.filter((d) => d.vehicleId == vehicleId);
  }
}
