import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {DeliveryTypeNames} from "../entities/delivery";
import {FixedDelivery} from "../entities/fixed-delivery";
import {Subscription} from "rxjs";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-fixed-deliveries',
  templateUrl: './fixed-deliveries.component.html',
  styleUrls: ['./fixed-deliveries.component.scss']
})
export class FixedDeliveriesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'type', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'actions'];
  dataSource = new MatTableDataSource<FixedDelivery>([]);
  deliveryTypeNames = DeliveryTypeNames;
  editRoute = '/fixed-deliveries';
  count = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private subscription: Subscription;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    this.apiService.getFixedDeliveryCount().then((countObj) => {
      this.count = countObj.count;
      this.initTable();
    });
    this.subscription = this.paginator.page.subscribe(() => {
      this.initTable();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  initTable() {
    this.apiService.getFixedDeliveries(this.paginator.pageIndex * this.paginator.pageSize, this.paginator.pageSize).then((fixedDeliveries) => {
      this.dataSource.data = fixedDeliveries;
    });
  }

  remove(id:number) {
    if (!confirm("Вы действительно хотите удалить запись?"))
      return;
    this.apiService.deleteFixedDelivery(id).then((r) => {
      this.initTable();
    });
  }
}
