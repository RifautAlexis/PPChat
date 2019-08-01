import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '@shared/services/auth.service';
import { UserService } from '@shared/services/user.service';

import { IUser as User } from '@shared/models/User';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})

export class NavMenuComponent implements OnInit {

  currentUser: Observable<User>;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
    this.currentUser = new Observable<User>();
  }

  ngOnInit() {

    this.authService.isLoggedObservable().subscribe(
      (isLogged: boolean) => {

        if(isLogged) {

          this.currentUser = this.userService.getConnectedUser();

        }

      }

    );
  }

  logout() {
    this.authService.logout();
    this.currentUser = null;
    this.router.navigate(['/']);
  }

}
