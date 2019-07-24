import { AuthService } from './../../services/auth.service';
import { IUser as User } from './../../Models/User';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})

export class NavMenuComponent implements OnInit {

  currentUser: Observable<User>;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
    this.currentUser == new Observable<User>();
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
