import {Component, Input, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {Vehicle} from "../entities/vehicle";
import {of, Subscription} from "rxjs";
import {ApiService} from "../api.service";
import {Delivery} from "../entities/delivery";

@Component({
  selector: 'app-delivery-table',
  templateUrl: './delivery-table.component.html',
  styleUrls: ['./delivery-table.component.scss']
})
export class DeliveryTableComponent implements OnInit, OnDestroy, OnChanges {
  @Input() dayPart: 1|2;
  @Input() date: Date;
  currentDate: Date;
  displayedColumns: string[] = ['id', 'invoices', 'organization', 'address', 'phone', 'recipientName', 'comment', 'vehicle', 'createrUser', 'actions'];
  dataSource = new MatTableDataSource<Delivery>([]);
  editRoute = '/delivery';
  count = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private subscription: Subscription;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.subscription = this.paginator.page.subscribe(() => {
      this.initTable();
    });
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.currentDate = new Date(this.date);
    this.currentDate.setHours(this.currentDate.getHours() + this.dayPart==1?0:4);
    this.apiService.getDeliveriesCount(this.currentDate).then((countObj) => {
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
    this.apiService.getDeliveries(this.paginator.pageIndex * this.paginator.pageSize, this.paginator.pageSize, this.currentDate).then((deliveries) => {
      this.dataSource.data = deliveries;
    });
  }

  remove(id:number) {
    if (!confirm("Вы действительно хотите удалить запись?"))
      return;
    this.apiService.deleteDelivery(id).then((r) => {
      this.initTable();
    });
  }
}
