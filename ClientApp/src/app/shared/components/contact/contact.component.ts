import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { IUser as User } from '@shared/models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Tools } from '../../../helpers/tools';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  findUserForm: FormGroup;

  filteredUsers: User[];
  search: string;
  isLoading: Boolean = false;

  contacts: User[];

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private userService: UserService, private tools: Tools, private router: Router, private authService: AuthService) { }

  ngOnInit() {

    this.findUserForm = this.formBuilder.group({
      findUser: ['', [Validators.required, Validators.minLength(1)]]
    });

    this.route.paramMap.subscribe(params => {

      if (params.has('username')) {
        this.userService.findUsers(params.get('username')).then(
          (users: User[]) => {
            this.filteredUsers = users;
          });
      }

    });

    this.loadContacts();

    this.findUserForm
        .get('findUser')
        .valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
        )
        .subscribe(
          (username: string) => {

            this.isLoading = true;

            if (this.tools.isStringEmpty(username)) {
              this.filteredUsers = [];
              this.isLoading = false;

            } else {

              this.userService.findUsers(username).then(
                (users: User[]) => {
                  this.filteredUsers = users;
                  this.isLoading = false;
                });
            }
          }
        );

  }

  searchUser() {

    if (this.findUserForm.invalid) {
      return;
    }

    let search: string = this.findUserForm.controls.findUser.value;

    this.router.navigate(['/me/contacts/' + search]);

  }

  removeContact(contactId: string) {
    this.userService.removeContact(contactId).then(
      (isRemoved: Boolean) => {

        if (isRemoved) {
          this.loadContacts();
        }
      }
    );
  }

  addContact(contactId: string) {
    this.userService.addContact(contactId).then(
      (isAdded: Boolean) => {

        if (isAdded) {
          this.loadContacts();
        }
      }
    );
  }

  private loadContacts() {
    this.userService.getContacts(this.authService.getLoggedUserId()).then(
      (contacts: User[]) => {
        console.log(contacts);
        this.contacts = contacts;
      }
    );
  }

}
