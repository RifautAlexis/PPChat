import { Injectable } from '@angular/core';
import { IUser as User } from '../Models/User';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public static decodeToken(token: string): any {
    console.log(token);
    var tokenDecoded: string = jwt_decode(token);
    console.log(tokenDecoded);
    return tokenDecoded;
  }

}
