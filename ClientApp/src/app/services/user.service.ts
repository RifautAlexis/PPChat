import { TokenService } from './token.service';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { IUser as User } from './../Models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient, private TokenService: TokenService) {}

  getAll() {
    return this.http.get<User[]>(`api/users`);
  }

  delete(id: string) {
    return this.http.delete(`api/users/${id}`);
  }

  getConnectedUser(): Promise<object> {

    let id: string = this.TokenService.getIdFromToken();
    
    return this.http.get<object>(`api/users/${id}`).toPromise();

  }
}
