import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {ApiService} from '../api.service';
import {User} from '../entities/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'login', 'firstName', 'lastName', 'active', 'role'];
  dataSource = new MatTableDataSource<User>([]);
  editRoute = '/users';

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.apiService.getUsers().then((users) => {
      this.dataSource.data = users;
    });
  }
}

