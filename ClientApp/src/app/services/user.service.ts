import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { IUser } from './../Models/User';

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<IUser[]>(`api/user`);
  }

  register(user: IUser) {
    return this.http.post(`api/user/register`, user);
  }

  delete(id: number) {
    return this.http.delete(`api/user/${id}`);
  }
}
