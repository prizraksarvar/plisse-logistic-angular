import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'login', 'firstName', 'lastName', 'active', 'role'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
  active: boolean;
  role: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, login: 'admin', firstName: 'sarvar', lastName: 'admin', active: true, role: 'администратор'},
];
