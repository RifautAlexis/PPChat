import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { IUserRegister as UserRegister } from '@shared/models/UserRegister';

import { AuthService } from '@shared/services/auth.service';
import { AlertService } from '@shared/services/alert.service';

import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private alertService: AlertService, private dialogRef: MatDialogRef<RegisterComponent>) { }

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
          this.dialogRef.close();
          this.router.navigate(['/chats']);
        }
      }
    );

  }

  cancel() {
    this.dialogRef.close();
  }

}
