import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatDatepicker, MatDatepickerInputEvent, MatPaginator, MatTableDataSource} from "@angular/material";
import {Vehicle} from "../entities/vehicle";
import {of, Subscription} from "rxjs";
import {ApiService} from "../api.service";
import {Delivery, DeliveryType} from "../entities/delivery";
import {PreloaderService} from "../preloader/preloader.service";
import {TableAction} from "../entities/table-action";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delivery-table',
  templateUrl: './delivery-table.component.html',
  styleUrls: ['./delivery-table.component.scss']
})
export class DeliveryTableComponent implements OnInit, OnDestroy, OnChanges {
  @Input() dayType: DeliveryType;
  @Input() date: Date;
  @Output() change: EventEmitter<void> = new EventEmitter<void>();
  @Input() editDisabled: boolean;
  @Input() addDisabled: boolean;
  @Input() additionalActions: TableAction[];
  @Input() rowDisable: (row: Delivery)=>boolean = (r)=>false;
  currentDate: Date;
  displayedColumns: string[] = ['id', 'time', 'invoices', 'organization', 'address', 'phone', 'recipientName', 'comment', 'vehicle', 'createrUser', 'actions'];
  dataSource = new MatTableDataSource<Delivery>([]);
  editRoute = '/delivery';
  count = 0;
  vehicles: Vehicle[];

  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private subscription: Subscription;

  constructor(
    private apiService: ApiService,
    private preloaderService: PreloaderService,
    private router: Router) {
  }

  ngOnInit() {
    this.vehicles = [];
    this.apiService.getVehicles(0, 100).then((vehicles) => {
      this.vehicles = vehicles;
    });
    /*this.subscription = this.paginator.page.subscribe(() => {
      this.initTable();
    });*/
    this.initTable();
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (!this.additionalActions) {
      this.additionalActions = [];
    }
    this.currentDate = new Date(this.date);
    this.currentDate.setHours(this.currentDate.getHours(), 0, 0, 0);
    this.apiService.getDeliveriesCount(this.currentDate, this.dayType).then((countObj) => {
      this.count = countObj.count;
      this.initTable();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  initTable() {
    this.preloaderService
      .wrapPreloader(this.apiService.getDeliveries(0, 100, this.currentDate, this.dayType)) //this.paginator.pageIndex * this.paginator.pageSize, this.paginator.pageSize,
      .then((deliveries) => {
        this.dataSource.data = deliveries;
      });
  }

  remove(id: number) {
    if (!confirm("Вы действительно хотите удалить запись?"))
      return;
    this.apiService.deleteDelivery(id).then((r) => {
      this.initTable();
      this.change.emit();
    });
  }

  setVehicle(element: Delivery, vehicleId: number) {
    this.preloaderService
      .wrapPreloader(this.apiService.updateDelivery({id: element.id, vehicleId: vehicleId} as Delivery))
      .then(() => {
        this.initTable();
        this.change.emit();
      });
    return false;
  }

  setDate(element: Delivery, event: MatDatepickerInputEvent<Date>) {
    if (!event.value)
      return true;
    let date = new Date(event.value);
    date.setHours(this.currentDate.getHours(), 0, 0, 0);
    this.setDateType(element.id, date, element.type);
    return false;
  }

  setType(element: Delivery) {
    let type = this.dayType == DeliveryType.internalDelivery
      ? DeliveryType.internalDelivery
      : (this.dayType == DeliveryType.firstDayPart ? DeliveryType.secondDayPart : DeliveryType.firstDayPart);
    this.setDateType(element.id, element.dateTime, type);
    return false;
  }

  rowClick(element: Delivery) {
    if (this.editDisabled)
      return false;
    this.router.navigate([this.editRoute, element.id]);
    return false;
  }

  errorHandler(e) {
    alert(e.error.error.message);
    throw new Error("error");
  }

  getStartDate() {
    return new Date();
  }

  private setDateType(id:number, dateTime: Date, type: DeliveryType) {
    this.preloaderService
      .wrapPreloader(this.apiService.updateDelivery({id: id, dateTime: dateTime, type: type} as Delivery))
      .then(() => {
        this.initTable();
        this.change.emit();
      }).catch(this.errorHandler.bind(this));
  }
}
