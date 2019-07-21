import { AuthService } from './../../services/auth.service';
import { IUser as User } from './../../Models/User';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IToken as Token } from './../../Models/Token';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})

export class NavMenuComponent implements OnInit {

  currentUser: User;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
    this.currentUser == null;
  }

  ngOnInit() {
    
    this.authService.isLoggedObservable().subscribe(
      (isLogged: boolean) => {
        
        if(isLogged) {
          
          this.userService.getConnectedUser().then(
            (user: User) => {
              
              this.currentUser = user;
              
            },
            (error) => console.log(error)
          );
          
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
