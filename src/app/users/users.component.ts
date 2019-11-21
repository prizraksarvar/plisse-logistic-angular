import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {ApiService} from '../api.service';
import {User} from '../entities/user';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'login', 'firstName', 'lastName', 'active', 'role'];
  dataSource = new MatTableDataSource<User>([]);
  editRoute = '/users';
  count = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private subscription: Subscription;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    this.apiService.getUsersCount().then((countObj) => {
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
    this.apiService.getUsers(this.paginator.pageIndex * this.paginator.pageSize, this.paginator.pageSize).then((users) => {
      this.dataSource.data = users;
    });
  }
}

