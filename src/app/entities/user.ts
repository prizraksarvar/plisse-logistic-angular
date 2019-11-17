import {Role} from './role';

export class User {
  id = 0;
  login = '';
  firstName = '';
  lastName = '';
  active = false;
  roleId = 0;
  role: Role;
}
