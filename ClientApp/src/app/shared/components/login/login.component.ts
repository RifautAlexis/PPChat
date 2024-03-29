import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { IUserLogin as UserLogin } from '@shared/models/UserLogin';

import { AuthService } from '@shared/services/auth.service';

import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.authService.isLogged()) {
      this.router.navigate(['/']);
    }

  }

  onSubmit() {

    if (this.loginForm.invalid) {
      return;
    }

    let userLogin: UserLogin = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    };

    this.authService.login(userLogin).then(
      (reponse: any) => {

        if (this.authService.isLogged()) {
          this.dialogRef.close();
          this.router.navigate(['/me']);
        }

      }
    );

  }

  cancel() {
    this.dialogRef.close();
  }

}
