import { AuthService } from './../../services/auth.service';
import { IUser as User } from './../../Models/User';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})

export class NavMenuComponent {

  currentUser: User;

  constructor(private authService: AuthService, private router: Router) {

    this.authService.currentUser$.subscribe(x => this.currentUser = x);
    
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
