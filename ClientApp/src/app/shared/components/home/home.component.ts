import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@shared/services/auth.service';
import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material';

import { LoginComponent } from '@shared/components/login/login.component';
import { RegisterComponent } from '@shared/components/register/register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  isLogged: Observable<Boolean>;
  logOrSign: Boolean = false;

  constructor(private authService: AuthService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {

    if (this.authService.isLogged()) {
      this.router.navigate(['/me']);
    }
  }

  openDialogLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  openDialogRegister(): void {
    const dialogRef = this.dialog.open(RegisterComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
