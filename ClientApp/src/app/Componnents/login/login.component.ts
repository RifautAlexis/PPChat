import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IUser } from '../../Models/User';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  loginForm: FormGroup;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute, private alertService: AlertService) { 
    
    if (this.authService.currentUserValue) { 
      this.router.navigate(['/']);
    }
    
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  onSubmit() {

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log("OK");
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log("PAS BON");
          console.log(error);
          this.alertService.error(error);
        });
  }

}
