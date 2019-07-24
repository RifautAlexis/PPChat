import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

    if (this.authService.isLogged()) {
      this.router.navigate(['/chats']);
    }

  }
}
