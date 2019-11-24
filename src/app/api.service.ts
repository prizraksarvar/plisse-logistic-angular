import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './entities/user';
import {Role} from './entities/role';
import {Vehicle} from "./entities/vehicle";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = 'https://plisse-logistic.sarvarcorp.ru';

  constructor(private http: HttpClient) {
  }


  public getUsersCount(): Promise<{count: number}> {
    return this.http.get(
      this.API_URL + '/users/count', this.getOptions()).toPromise() as Promise<{count: number}>;
  }

  public getUsers(offset: number, limit: number): Promise<User[]> {
    return this.http.get(
      this.API_URL + '/users?filter[offset]=' + offset + '&filter[limit]=' + limit, this.getOptions()).toPromise() as Promise<User[]>;
  }

  public getUser(id: string): Promise<User> {
    return this.http.get(this.API_URL + '/users/' + id, this.getOptions()).toPromise() as Promise<User>;
  }

  public createUser(user: User): Promise<User> {
    return this.http.post(this.API_URL + '/users', user, this.getOptions()).toPromise() as Promise<User>;
  }

  public updateUser(user: User): Promise<User> {
    return this.http.patch(this.API_URL + '/users/' + user.id, user, this.getOptions()).toPromise() as Promise<User>;
  }

  public deleteUser(id: number): Promise<{description?:string, error?:{}}> {
    return this.http.delete(this.API_URL + '/users/' + id, this.getOptions()).toPromise() as Promise<{description?:string, error?:{}}>;
  }


  public getRolesCount(): Promise<{count: number}> {
    return this.http.get(
      this.API_URL + '/roles/count', this.getOptions()).toPromise() as Promise<{count: number}>;
  }

  public getRoles(offset: number, limit: number): Promise<Role[]> {
    return this.http.get(
      this.API_URL + '/roles?filter[offset]=' + offset + '&filter[limit]=' + limit, this.getOptions()).toPromise() as Promise<Role[]>;
  }

  public getRole(id: string): Promise<Role> {
    return this.http.get(this.API_URL + '/roles/' + id, this.getOptions()).toPromise() as Promise<Role>;
  }

  public createRole(role: Role): Promise<Role> {
    return this.http.post(this.API_URL + '/roles', role, this.getOptions()).toPromise() as Promise<Role>;
  }

  public updateRole(role: Role): Promise<Role> {
    return this.http.patch(this.API_URL + '/roles/' + role.id, role, this.getOptions()).toPromise() as Promise<Role>;
  }

  public deleteRole(id: number): Promise<{description?:string, error?:{}}> {
    return this.http.delete(this.API_URL + '/roles/' + id, this.getOptions()).toPromise() as Promise<{description?:string, error?:{}}>;
  }


  public getVehiclesCount(): Promise<{count: number}> {
    return this.http.get(
      this.API_URL + '/vehicles/count', this.getOptions()).toPromise() as Promise<{count: number}>;
  }

  public getVehicles(offset: number, limit: number): Promise<Vehicle[]> {
    return this.http.get(
      this.API_URL + '/vehicles?filter[offset]=' + offset + '&filter[limit]=' + limit, this.getOptions()).toPromise() as Promise<Vehicle[]>;
  }

  public getVehicle(id: string): Promise<Vehicle> {
    return this.http.get(this.API_URL + '/vehicles/' + id, this.getOptions()).toPromise() as Promise<Vehicle>;
  }

  public createVehicle(user: Vehicle): Promise<Vehicle> {
    return this.http.post(this.API_URL + '/vehicles', user, this.getOptions()).toPromise() as Promise<Vehicle>;
  }

  public updateVehicle(user: Vehicle): Promise<Vehicle> {
    return this.http.patch(this.API_URL + '/vehicles/' + user.id, user, this.getOptions()).toPromise() as Promise<Vehicle>;
  }

  public deleteVehicle(id: number): Promise<{description?:string, error?:{}}> {
    return this.http.delete(this.API_URL + '/vehicles/' + id, this.getOptions()).toPromise() as Promise<{description?:string, error?:{}}>;
  }


  private getOptions() {
    return {headers: {'Content-Type': 'application/json'}};
  }
}
