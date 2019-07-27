import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { AlertService } from './../../services/alert.service';
import { IUserRegister as UserRegister } from 'src/app/Models/UserRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private alertService: AlertService) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.authService.isLogged()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {

    this.alertService.clear();

    if (this.registerForm.invalid) {
      return;
    }

    let userRegister: UserRegister = {
      email: this.registerForm.controls.email.value,
      username: this.registerForm.controls.username.value,
      password: this.registerForm.controls.password.value
    };

    this.authService.register(userRegister).then(
      (reponse: any) => {
        if (this.authService.isLogged()) {
          this.router.navigate(['/chats']);
        }
      }
    );

  }

}
