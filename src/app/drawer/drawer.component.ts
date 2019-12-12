import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit, OnDestroy {
  menuItems: MenuItem[] = [
    {name: 'Пользователи', link: '/users', roles: [1]},
    {name: 'Роли', link: '/roles', roles: [1]},
    {name: 'Доставки', link: '/delivery/month', roles: [1,2,3,4]},
    {name: 'Машины', link: '/vehicles', roles: [1,2]},
    {name: 'Отчеты', link: '/delivery/add', roles: [1,2]},
  ];
  roleId: number = 0;
  subscription:Subscription;
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.user.subscribe((user) => {
      if (user) {
        this.roleId = user.roleId;
      } else {
        this.roleId = 0;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  getMenuItems() {
    return this.menuItems.filter((m)=>{
      return m.roles.indexOf(this.roleId)!=-1;
    });
  }
}

export class MenuItem {
  name: string;
  link: string;
  roles: number[];
}
