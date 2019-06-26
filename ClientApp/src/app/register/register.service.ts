import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IUser as User } from '../Models/User';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class RegisterService {

    constructor(private http: HttpClient, public router: Router) {
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    /** POST: add a new user to the database */
    addUser(user: User): boolean {

        const usersUrl = 'http://localhost:5000/api/user';
        let dataToSend: string;
        dataToSend = JSON.stringify(user);

        this.http.post<User>(usersUrl, dataToSend, this.httpOptions).subscribe({
          next: value => {

            if (value != null) {

              this.router.navigate(['/']);

            }
          },
          error: err => console.log(err),
          complete: () => console.log('REGISTER DONE !')
        });

        return true;

    }

}

