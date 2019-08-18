import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

import { AuthService } from '@shared/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  isLogged: Observable<Boolean>;
  logOrSign: Boolean = false;

  constructor(private authService: AuthService, private router: Router, private location: Location) { }

  ngOnInit() {

    if (this.authService.isLogged()) {
      this.router.navigate(['/me']);
    }
  }
}
