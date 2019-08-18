import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {

  findUserForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.findUserForm = this.formBuilder.group({
      findUser: ['', [Validators.required, Validators.minLength(1)]]
    });

  }

  searchUser() {

    if (this.findUserForm.invalid) {
      return;
    }

    let search: string = this.findUserForm.controls.findUser.value;

    return search;

  }

}
