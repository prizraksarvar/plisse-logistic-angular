import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {Subscription} from "rxjs";
import {ApiService} from "../api.service";
import {Vehicle} from "../entities/vehicle";

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'active', 'user', 'actions'];
  dataSource = new MatTableDataSource<Vehicle>([]);
  editRoute = '/vehicles';
  count = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private subscription: Subscription;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    this.apiService.getVehiclesCount().then((countObj) => {
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
    this.apiService.getVehicles(this.paginator.pageIndex * this.paginator.pageSize, this.paginator.pageSize).then((vehicles) => {
      this.dataSource.data = vehicles;
    });
  }

  remove(id:number) {
    if (!confirm("Вы действительно хотите удалить запись?"))
      return;
    this.apiService.deleteVehicle(id).then((r) => {
      this.initTable();
    });
  }
}
