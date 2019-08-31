import { IUserLogin as UserLogin } from '@shared/models/UserLogin';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { TokenService } from '@shared/services/token.service';
import { IUserRegister as UserRegister } from '@shared/models/UserRegister';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: BehaviorSubject<boolean>;
  public loggedIn$: Observable<boolean>;

  constructor(private http: HttpClient, private tokenService: TokenService) {

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
    if (this.tokenService.hasToken()) {
      return this.tokenService.getIdFromToken();
    }

    return null;
  }

  async login(userLogin: UserLogin): Promise<any> {

    const loginUrl = 'api/authentication/login';

    return this.http.post<any>(loginUrl, userLogin)
      .toPromise()
      .then(
        (response: any) => {

          console.log(response);

          if (response.StatusCode === 200) {

            localStorage.setItem('token', response.Result);

            this.loggedIn.next(true);
          }

        });
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  register(userRegister: UserRegister): Promise<any> {

    const loginUrl = 'api/authentication/register';

    return this.http.post<any>(loginUrl, userRegister)
      .toPromise()
      .then(
        (response: any) => {

          if (response.StatusCode === 200) {

            localStorage.setItem('token', response.Result);

            this.loggedIn.next(true);
          }

        });
  }

}
