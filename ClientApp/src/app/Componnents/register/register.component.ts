import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from './../../services/auth.service';
import { AlertService } from './../../services/alert.service';
import { UserService } from './../../services/User.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private alertService: AlertService
    ) {
      // Redirect to home if already logged in
      if (this.authService.currentUserValue) {
        this.router.navigate(['/']);
      }
     }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    });
  }

  onSubmit() {

    this.alertService.clear();

    if (this.registerForm.invalid) {
      return;
    }
    
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/']);
        },
        error => {
          this.alertService.error(error);
        }
      );

  }

}
