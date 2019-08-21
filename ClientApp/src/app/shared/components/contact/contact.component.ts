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
  search: string = '';
  isLoading: Boolean = false;

  contacts: User[];

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private userService: UserService, private tools: Tools, private router: Router, private authService: AuthService) { }

  ngOnInit() {

    this.findUserForm = this.formBuilder.group({
      findUser: ['', [Validators.required, Validators.minLength(1)]]
    });

    this.loadContacts().then(
      () => {
        this.route.paramMap.subscribe(params => {

          if (params.has('username')) {

            this.search = params.get('username');
            this.userService.findUsers(this.search).then(
              (users: User[]) => {
                this.filteredUsers = users.filter(
                  item =>
                    !this.contacts.map(u => u.id).includes(item.id) &&
                    item.id !== this.authService.getLoggedUserId()
                );
              });
          }

        });
      }
    );


    this.loadContacts();

    this.searchUsers();

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

          if (this.search.length > 0) {
            this.userService.findUsers(this.search).then(
              (users: User[]) => {
                this.filteredUsers = users.filter(
                  item =>
                    !this.contacts.map(u => u.id).includes(item.id) &&
                    item.id !== this.authService.getLoggedUserId()
                );
              });
          }
        }
      }
    );
  }

  addContact(contactId: string) {
    this.userService.addContact(contactId).then(
      (isAdded: Boolean) => {

        if (isAdded) {
          this.loadContacts();

          let search = this.findUserForm.get('findUser').value;

          if (this.tools.isStringEmpty(search)) {
            this.filteredUsers = [];

          } else {

            this.userService.findUsers(search).then(
              (users: User[]) => {
                this.filteredUsers = users.filter(
                  item =>
                    !this.contacts.map(u => u.id).includes(item.id) &&
                    item.id !== this.authService.getLoggedUserId()
                );
              console.log(this.filteredUsers);

              });
          }

        }
      }
    );


  }

  private loadContacts(): Promise<void | User[]> {
    return this.userService.getContacts(this.authService.getLoggedUserId()).then(
      (contacts: User[]) => {

        this.contacts = contacts;
      }
    );
  }

  private searchUsers() {
    this.findUserForm
      .get('findUser')
      .valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe(
        (username: string) => {

          this.search = username;
          this.isLoading = true;

          if (this.tools.isStringEmpty(username)) {

            this.filteredUsers = [];
            this.isLoading = false;

          } else {

            this.userService.findUsers(username).then(
              (users: User[]) => {
                this.filteredUsers = users.filter(
                  item =>
                    !this.contacts.map(u => u.id).includes(item.id) &&
                    item.id !== this.authService.getLoggedUserId()
                );
                console.log(this.filteredUsers);

                this.isLoading = false;
              });
          }
        }
      );
  }

}
