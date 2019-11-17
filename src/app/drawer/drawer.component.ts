import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {
  menuItems: MenuItem[] = [
    {name: 'Пользователи', link: '/users'},
    {name: 'Роли', link: '/roles'},
    {name: 'Доставки', link: '/delivery'},
    {name: 'Машины', link: '/vehicle'},
    {name: 'Отчеты', link: '/'},
  ];
  constructor() { }

  ngOnInit() {
  }

}

export class MenuItem {
  name: string;
  link: string;
}
