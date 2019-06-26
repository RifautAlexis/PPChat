import { IUser } from './../Models/User';
import { RegisterService } from './register.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  constructor(private fb: FormBuilder, private registerService: RegisterService) { }

  registerForm = this.fb.group({
    pseudo: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    console.log(this.registerForm.value);
    const user: IUser = ({pseudo: this.registerForm.value.pseudo, password: this.registerForm.value.password});

    this.registerService.addUser(user);
  }

}
