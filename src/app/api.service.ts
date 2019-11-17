import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './entities/user';
import {Role} from "./entities/role";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  public getUsers(): Promise<User[]> {
    return this.http.get(this.API_URL + '/users', this.getOptions()).toPromise() as Promise<User[]>;
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

  public getRoles(): Promise<Role[]> {
    return this.http.get(this.API_URL + '/roles', this.getOptions()).toPromise() as Promise<Role[]>;
  }

  public getRole(id: string): Promise<Role> {
    return this.http.get(this.API_URL + '/roles/' + id, this.getOptions()).toPromise() as Promise<Role>;
  }

  private getOptions() {
    return {headers: {'Content-Type': 'application/json'}};
  }
}
