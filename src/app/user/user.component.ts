import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../entities/user';
import {Role} from '../entities/role';
import {BaseControl} from '../editor-form/base-control';
import {TextboxControl} from '../editor-form/textbox-control';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: User;
  roles: Role[];

  controls: BaseControl<any>[];

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    this.controls = [];
    this.controls.push(new TextboxControl({
      key: 'id',
      type: 'text',
      label: 'ИД',
    }));
  }

  ngOnInit() {
    this.user = new User();
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== '0') {
      this.apiService.getUser(id).then((user) => {
        this.user = user;
      });
    }
    this.apiService.getRoles().then((roles) => {
      this.roles = roles;
    });
  }

  save() {
    if (this.user.id !== 0) {
      this.apiService.updateUser(this.user);
    } else {
      this.apiService.createUser(this.user);
    }
    this.router.navigate(['/users']);
    return false;
  }
}
