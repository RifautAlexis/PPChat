import { IToken as Token } from './../Models/Token';
import { Injectable } from '@angular/core';
import { IUser as User } from '../Models/User';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: BehaviorSubject<boolean>;
  private userLoggedIn: BehaviorSubject<Token>;

  constructor(private http: HttpClient) {

    this.loggedIn = new BehaviorSubject<boolean>(this.hasToken());
    this.userLoggedIn = new BehaviorSubject<Token>(this.getUserFromToken());
  }

  getUserLoggedIn(): Observable<Token> {
    return this.userLoggedIn.asObservable();
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  isLogged(): boolean {
    let isLogged: boolean;
    this.loggedIn.asObservable().subscribe(x => isLogged = x);
    return isLogged;
  }

  login(username: string, password: string) {

    const loginUrl = 'api/authentication/login';

    var data = { 'username': username, 'password': password };

    this.http.post<any>(loginUrl, data).subscribe(
      (token: string) => {
        
        localStorage.setItem('Token', token);

        this.loggedIn.next(true);
        
        this.userLoggedIn.next(this.getUserFromToken());
      });
  }

  logout() {
    localStorage.removeItem('Token');
    this.loggedIn.next(false);
    this.userLoggedIn.next(null);
  }

  register(userToRegistrer: User) {

    this.http.post(`api/authentication/register`, userToRegistrer).subscribe(
      (token: string) => {

        localStorage.setItem('Token', token);

        this.loggedIn.next(true);
        
        this.userLoggedIn.next(this.getUserFromToken());
      });
  }

  private getUserFromToken(): Token {

    if (this.hasToken()) {

      let token: string = localStorage.getItem('Token');

      let user: Token = this.decodeToken(token);

      return user;
    }

    return null;
  }

  private decodeToken(token: string): Token {
    var decoded: Token = jwt_decode(token);
    return decoded;
  }

  private hasToken() {
    return !!localStorage.getItem('Token');
  }

}
