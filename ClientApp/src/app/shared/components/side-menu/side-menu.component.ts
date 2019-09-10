import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '@shared/services/auth.service';

import { IUser as User } from '@shared/models/User';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  currentUser: Observable<User>;

  constructor(private authService: AuthService, private router: Router) {
    this.currentUser = new Observable<User>();
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.currentUser = null;
    this.router.navigate(['/']);
  }

}
