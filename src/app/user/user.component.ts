import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../entities/user';
import {Role} from '../entities/role';
import {BaseControl} from '../editor-form/base-control';
import {TextboxControl} from '../editor-form/textbox-control';
import {CheckboxControl} from '../editor-form/checkbox-control';
import {DropdownControl} from '../editor-form/dropdown-control';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public initialized = false;

  user: User;
  roles: Role[] = [];

  controls: BaseControl<any>[] = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    this.initControls();
  }

  ngOnInit() {
    this.user = new User();
    const id = this.route.snapshot.paramMap.get('id');
    this.apiService.getRoles().then((roles) => {
      this.roles = roles;
      this.initControls();
    });
    if (id !== '0') {
      this.apiService.getUser(id).then((user) => {
        this.user = user;
        this.initialized = true;
      });
    } else {
      this.initialized = true;
    }
  }

  save(user: User) {
    if (user.id !== 0) {
      this.apiService.updateUser(user);
    } else {
      this.apiService.createUser(user);
    }
    this.router.navigate(['/users']);
    return false;
  }

  private initControls() {
    this.controls = [];
    this.controls.push(new TextboxControl({
      key: 'id',
      type: 'text',
      label: 'ИД',
      disabled: true,
    }));
    this.controls.push(new CheckboxControl({
      key: 'active',
      label: 'Активен',
    }));
    this.controls.push(new TextboxControl({
      key: 'login',
      type: 'text',
      label: 'Логин',
    }));
    this.controls.push(new TextboxControl({
      key: 'password',
      type: 'password',
      label: 'Пароль',
    }));
    this.controls.push(new TextboxControl({
      key: 'firstName',
      type: 'text',
      label: 'Имя',
    }));
    this.controls.push(new TextboxControl({
      key: 'lastName',
      type: 'text',
      label: 'Фамилия',
    }));
    const options = [];
    this.roles.forEach((item) => {
      options.push({
        key: item.id,
        value: item.name,
      });
    });
    this.controls.push(new DropdownControl({
      key: 'roleId',
      label: 'Роль',
      options,
    }));
  }
}
