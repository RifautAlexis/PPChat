import { IUserLogin as UserLogin } from './../../Models/UserLogin';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private alertService: AlertService) { }

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
          this.router.navigate(['/chats']);
        }
      }
    );

  }

}
