import { UserLogin } from './../Models/UserLogin';
import { IToken as Token } from './../Models/Token';
import { Injectable } from '@angular/core';
import { IUser as User } from '../Models/User';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, from } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { TokenService } from './token.service';
import { Tools } from '../helpers/tools';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: BehaviorSubject<boolean>;
  public loggedIn$: Observable<boolean>

  constructor(private http: HttpClient, private tokenService: TokenService, private tools: Tools) {

    this.loggedIn = new BehaviorSubject<boolean>(this.tokenService.hasToken());
    this.loggedIn$ = this.loggedIn.asObservable();
  }

  isLogged(): boolean {
    return this.loggedIn.getValue();
  }

  isLoggedObservable(): Observable<boolean> {
    return this.loggedIn$;
  }

  getLoggedUserId(): string {
    if (this.tokenService.hasToken())
      return this.tokenService.getIdFromToken();

    return null;
  }

  async login(userLogin: UserLogin): Promise<any> {

    const loginUrl = 'api/authentication/login';

    return this.http.post<any>(loginUrl, userLogin)
    .toPromise()
    .then(
      (token: string) => {

        if (! this.tools.isStringEmpty(token)) {

          localStorage.setItem('token', token);

          this.loggedIn.next(true);
        }

      });
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  register(username: string, password: string) {

    const loginUrl = 'api/authentication/register';

    var data = { 'Username': username, 'Password': password };

    this.http.post(loginUrl, data).subscribe(
      (token: string) => {

        localStorage.setItem('token', token);

        this.loggedIn.next(true);

      });
  }

}
