import { Injectable } from '@angular/core';
import { IUser as User } from '../Models/User';
import * as jwt_decode from "jwt-decode";
import { IToken as Token } from './../Models/Token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public getIdFromToken(): string {

    if (this.hasToken()) {
      
      let token: string = localStorage.getItem('token');

      let tokenDecoded: Token = this.decodeToken(token);
      
      return tokenDecoded.id;
    }

    return null;
  }

  private decodeToken(token: string): Token {
    var decoded: Token = jwt_decode(token);
    return decoded;
  }

  public hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

}
