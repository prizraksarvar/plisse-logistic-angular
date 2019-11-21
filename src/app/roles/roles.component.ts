import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {User} from "../entities/user";
import {ApiService} from "../api.service";
import {Subscription} from "rxjs";
import {Role} from "../entities/role";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name'];
  dataSource = new MatTableDataSource<Role>([]);
  editRoute = '/roles';
  count = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private subscription: Subscription;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    this.apiService.getRolesCount().then((countObj) => {
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
    this.apiService.getRoles(this.paginator.pageIndex * this.paginator.pageSize, this.paginator.pageSize).then((items) => {
      this.dataSource.data = items;
    });
  }
}
