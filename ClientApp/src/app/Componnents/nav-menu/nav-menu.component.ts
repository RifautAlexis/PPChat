import { AuthService } from './../../services/auth.service';
import { IUser as User } from './../../Models/User';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IToken as Token } from './../../Models/Token';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})

export class NavMenuComponent implements OnInit {

  currentUser: Token;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getUserLoggedIn().subscribe(
      x =>
      {
        (x != null) ? this.currentUser = x : this.currentUser = null;
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
