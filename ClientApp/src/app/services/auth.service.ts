import { Injectable } from '@angular/core';
import { IUser as User } from '../Models/User';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private currentUserSubject$: BehaviorSubject<User>;
  public currentUser$: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject$ = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser$ = this.currentUserSubject$.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject$.value;
  }

  login(username: string, password: string) {

    const loginUrl = 'api/user/login';
    console.log(username);
    console.log(password);

    var data = { 'username': username, 'password': password };

    return this.http.post<any>(loginUrl, data).pipe(
      map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject$.next(user);
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('currentItem');
    this.currentUserSubject$.next(null);
  }
}
