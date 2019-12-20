import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {Vehicle} from "../entities/vehicle";
import {PreloaderService} from "../preloader/preloader.service";
import {Delivery, DeliveryType} from "../entities/delivery";

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
  deliveriesInternalPart: Delivery[] = [];

  constructor(private apiService: ApiService, private preloaderService: PreloaderService) {
  }

  ngOnInit() {
    this.apiService.getVehicles(0, 100).then((vehicles) => {
      this.vehicles = vehicles;
    });
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.initialized = false;
    let date = new Date(this.date);
    this.preloaderService
      .wrapPreloader(Promise.all([this.apiService.getDeliveries(0, 100, date, DeliveryType.firstDayPart)
        .then((deliveries) => {
          this.deliveriesFirstPart = deliveries;
          console.log(deliveries);
        }),
        this.apiService.getDeliveries(0, 100, date, DeliveryType.secondDayPart)
          .then((deliveries) => {
            this.deliveriesSecondPart = deliveries;
            console.log(deliveries);
          }),
        this.apiService.getDeliveries(0, 100, date, DeliveryType.internalDelivery)
          .then((deliveries) => {
            this.deliveriesInternalPart = deliveries;
            console.log(deliveries);
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

  getInternalDeliveries(vehicleId: number) {
    return this.deliveriesInternalPart.filter((d) => d.vehicleId == vehicleId);
  }
}
