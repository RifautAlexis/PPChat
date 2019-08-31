import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { IToken as Token } from '../models/Token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public getIdFromToken(): string {

    if (this.hasToken()) {

      let token: string = localStorage.getItem('token');

      let tokenDecoded: Token = this.decodeToken(token);

      return tokenDecoded.unique_name;
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
