import {Role} from './role';

export class User {
  id:number;
  login = '';
  firstName = '';
  lastName = '';
  password = '';
  active = false;
  roleId = 0;
  role: Role;
}
