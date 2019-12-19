import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './entities/user';
import {Role} from './entities/role';
import {Vehicle} from "./entities/vehicle";
import {Delivery, DeliveryCountByDate, DeliveryType} from "./entities/delivery"
import {Credentials} from "./auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //API_URL = 'http://localhost:3001/api';
  API_URL = 'https://plisse-logistic.sarvarcorp.ru/api';

  constructor(private http: HttpClient) {
  }


  public login(data: Credentials): Promise<{ token: string }> {
    return this.http.post(
      this.API_URL + '/users/login', data, this.getOptions()).toPromise().catch(this.globalErrorCatcher) as Promise<{ token: string }>;
  }

  public getUserProfile(): Promise<User> {
    return this.http.get(
      this.API_URL + '/users/me', this.getOptions()).toPromise().catch(this.globalErrorCatcher) as Promise<User>;
  }

  public getUsersCount(): Promise<{ count: number }> {
    return this.http.get(
      this.API_URL + '/users/count', this.getOptions()).toPromise().catch(this.globalErrorCatcher) as Promise<{ count: number }>;
  }

  public getUsers(offset: number, limit: number): Promise<User[]> {
    return this.http.get(
      this.API_URL + '/users?filter[offset]=' + offset + '&filter[limit]=' + limit, this.getOptions()).toPromise().catch(this.globalErrorCatcher) as Promise<User[]>;
  }

  public getUser(id: string): Promise<User> {
    return this.http.get(this.API_URL + '/users/' + id, this.getOptions()).toPromise().catch(this.globalErrorCatcher) as Promise<User>;
  }

  public createUser(user: User): Promise<User> {
    return this.http.post(this.API_URL + '/users', user, this.getOptions()).toPromise().catch(this.globalErrorCatcher) as Promise<User>;
  }

  public updateUser(user: User): Promise<User> {
    return this.http.patch(this.API_URL + '/users/' + user.id, user, this.getOptions()).toPromise().catch(this.globalErrorCatcher) as Promise<User>;
  }

  public deleteUser(id: number): Promise<{ description?: string, error?: {} }> {
    return this.http.delete(this.API_URL + '/users/' + id, this.getOptions()).toPromise().catch(this.globalErrorCatcher) as Promise<{ description?: string, error?: {} }>;
  }


  public getRolesCount(): Promise<{ count: number }> {
    return this.http.get(
      this.API_URL + '/roles/count', this.getOptions()).toPromise().catch(this.globalErrorCatcher) as Promise<{ count: number }>;
  }

  public getRoles(offset: number, limit: number): Promise<Role[]> {
    return this.http.get(
      this.API_URL + '/roles?filter[offset]=' + offset + '&filter[limit]=' + limit, this.getOptions()).toPromise().catch(this.globalErrorCatcher) as Promise<Role[]>;
  }

  public getRole(id: string): Promise<Role> {
    return this.http.get(this.API_URL + '/roles/' + id, this.getOptions()).toPromise().catch(this.globalErrorCatcher) as Promise<Role>;
  }

  public createRole(role: Role): Promise<Role> {
    return this.http.post(this.API_URL + '/roles', role, this.getOptions()).toPromise().catch(this.globalErrorCatcher) as Promise<Role>;
  }

  public updateRole(role: Role): Promise<Role> {
    return this.http.patch(this.API_URL + '/roles/' + role.id, role, this.getOptions()).toPromise().catch(this.globalErrorCatcher) as Promise<Role>;
  }

  public deleteRole(id: number): Promise<{ description?: string, error?: {} }> {
    return this.http.delete(this.API_URL + '/roles/' + id, this.getOptions()).toPromise().catch(this.globalErrorCatcher) as Promise<{ description?: string, error?: {} }>;
  }


  public getVehiclesCount(): Promise<{ count: number }> {
    return this.http.get(
      this.API_URL + '/vehicles/count', this.getOptions()).toPromise().catch(this.globalErrorCatcher) as Promise<{ count: number }>;
  }

  public getVehicles(offset: number, limit: number): Promise<Vehicle[]> {
    return this.http.get(
      this.API_URL + '/vehicles?filter[offset]=' + offset + '&filter[limit]=' + limit, this.getOptions()).toPromise().catch(this.globalErrorCatcher) as Promise<Vehicle[]>;
  }

  public getVehicle(id: string): Promise<Vehicle> {
    return this.http.get(this.API_URL + '/vehicles/' + id, this.getOptions()).toPromise().catch(this.globalErrorCatcher) as Promise<Vehicle>;
  }

  public createVehicle(user: Vehicle): Promise<Vehicle> {
    return this.http.post(this.API_URL + '/vehicles', user, this.getOptions()).toPromise().catch(this.globalErrorCatcher) as Promise<Vehicle>;
  }

  public updateVehicle(user: Vehicle): Promise<Vehicle> {
    return this.http.patch(this.API_URL + '/vehicles/' + user.id, user, this.getOptions()).toPromise().catch(this.globalErrorCatcher) as Promise<Vehicle>;
  }

  public deleteVehicle(id: number): Promise<{ description?: string, error?: {} }> {
    return this.http.delete(this.API_URL + '/vehicles/' + id, this.getOptions()).toPromise().catch(this.globalErrorCatcher) as Promise<{ description?: string, error?: {} }>;
  }


  public getDeliveriesCount(date: Date, type: DeliveryType): Promise<{ count: number }> {
    return this.http.get(
      this.API_URL + '/deliveries/count?where[dateTime]=' + date.toISOString() + '&where[type]=' + type.toString(), this.getOptions()).toPromise().catch(this.globalErrorCatcher) as Promise<{ count: number }>;
  }

  public getDeliveriesCountByDate(from: Date, to: Date): Promise<DeliveryCountByDate[]> {
    return this.http.get(
      this.API_URL + '/deliveries/countByDate?from=' + from.toISOString()
      + '&to=' + to.toISOString(), this.getOptions()).toPromise().catch(this.globalErrorCatcher) as Promise<DeliveryCountByDate[]>;
  }

  public getDeliveries(offset: number, limit: number, date: Date, type?: DeliveryType): Promise<Delivery[]> {
    return (this.http.get(
      this.API_URL + '/deliveries?filter[offset]=' + offset + '&filter[limit]=' + limit
      + '&filter[where][dateTime]=' + date.toISOString()
      + (type ? '&filter[where][type]=' + type.toString() : ''),
      this.getOptions()).toPromise() as Promise<Delivery[]>).then((ds) => {
      ds.forEach(this.prepareDelivery);
      return ds;
    }).catch(this.globalErrorCatcher) as Promise<Delivery[]>;
  }

  public getDelivery(id: string): Promise<Delivery> {
    return this.http.get(this.API_URL + '/deliveries/' + id, this.getOptions()).toPromise().then(this.prepareDelivery).catch(this.globalErrorCatcher) as Promise<Delivery>;
  }

  public createDelivery(delivery: Delivery): Promise<Delivery> {
    return this.http.post(this.API_URL + '/deliveries', delivery, this.getOptions()).toPromise().then(this.prepareDelivery).catch(this.globalErrorCatcher) as Promise<Delivery>;
  }

  public updateDelivery(delivery: Delivery): Promise<Delivery> {
    return this.http.patch(this.API_URL + '/deliveries/' + delivery.id, delivery, this.getOptions()).toPromise().then(this.prepareDelivery).catch(this.globalErrorCatcher) as Promise<Delivery>;
  }

  public deleteDelivery(id: number): Promise<{ description?: string, error?: {} }> {
    return this.http.delete(this.API_URL + '/deliveries/' + id, this.getOptions()).toPromise().catch(this.globalErrorCatcher) as Promise<{ description?: string, error?: {} }>;
  }

  private prepareDelivery(d:Delivery):Delivery {
    // @ts-ignore
    d.dateTime = new Date(Date.parse(d.dateTime));
    return d;
  }

  private globalErrorCatcher(e) {
    if (e.error.code == 401) {
      window.location.reload();
      return;
    } else {
      throw e;
    }
  }

  private getOptions() {
    let token = window.localStorage.getItem("auth_token");
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? 'Bearer ' + token : ''
      }
    };
  }

  private timeZoneFix(date: Date) {
    let ndate = new Date(date);
    ndate.setHours(date.getHours() + 5);
    return ndate;
  }
}
