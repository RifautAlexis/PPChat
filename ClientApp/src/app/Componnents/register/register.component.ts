import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { AlertService } from './../../services/alert.service';

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

    this.authService.register(this.registerForm.value);

    this.router.navigate(['/']);

  }

}
