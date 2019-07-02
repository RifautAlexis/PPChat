import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { IUser as User } from './../Models/User';

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>(`api/users`);
  }

  delete(id: number) {
    return this.http.delete(`api/users/${id}`);
  }
}
