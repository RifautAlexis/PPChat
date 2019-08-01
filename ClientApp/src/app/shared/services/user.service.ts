import { TokenService } from '@shared/services/token.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser as User } from '@shared/models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getAll() {
    return this.http.get<User[]>(`api/users`);
  }

  delete(id: string) {
    return this.http.delete(`api/users/${id}`);
  }

  getConnectedUser(): Observable<User> {

    let id: string = this.tokenService.getIdFromToken();

    return this.http.get<User>(`api/users/${id}`);

  }

}
