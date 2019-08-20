import { TokenService } from '@shared/services/token.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser as User } from '@shared/models/User';
import { Observable, of } from 'rxjs';
import { Tools } from './../../helpers/tools';

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient, private tokenService: TokenService, private tools: Tools) {}

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

  findUsers(username: string): Promise<User[]> {
    // if (this.tools.isStringEmpty(username)) {
    //   return of([]);
    // }
    return this.http.get<User[]>(`api/users/findUsers/${username}`).toPromise();
  }

  getContacts(userId: string): Promise<User[]> {
    return this.http.get<User[]>(`api/users/getContacts/${userId}`).toPromise();
  }

  removeContact(contactId: string): Promise<Boolean> {
    return this.http.delete<Boolean>(`api/users/removeContact/${contactId}`).toPromise();
  }

  addContact(contactId: string): Promise<Boolean> {
    return this.http.put<Boolean>(`api/users/addContact/${contactId}`, null).toPromise();
  }

}
