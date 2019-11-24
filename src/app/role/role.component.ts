import {Component, OnDestroy, OnInit} from '@angular/core';
import {Role} from "../entities/role";
import {BaseControl} from "../editor-form/base-control";
import {ApiService} from "../api.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {TextboxControl} from "../editor-form/textbox-control";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit, OnDestroy {
  public initialized = false;

  public role: Role;

  public controls: BaseControl<any>[] = [];
  private routeSubscription: Subscription;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    this.initControls();
  }

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
      this.role = new Role();
      const id = this.route.snapshot.paramMap.get('id');
      this.initControls();
      if (id !== 'add') {
        this.apiService.getRole(id).then((role) => {
          this.role = role;
          this.initialized = true;
        });
      } else {
        this.initialized = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  save(role: Role) {
    if (role.id > 0) {
      this.apiService.updateRole(role);
    } else {
      this.apiService.createRole(role);
    }
    this.router.navigate(['/roles']);
    return false;
  }

  cancel() {
    this.router.navigate(['/roles']);
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
    this.controls.push(new TextboxControl({
      key: 'name',
      type: 'text',
      label: 'Имя',
    }));
  }
}
