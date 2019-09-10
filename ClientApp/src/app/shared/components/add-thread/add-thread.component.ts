import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

import { MatDialogRef } from '@angular/material';

import { INewThread as NewThread } from '@shared/models/NewThread';

import { IUser as User } from '@shared/models/User';

import { ChatService } from '@shared/services/chat.service';
import { AuthService } from '@shared/services/auth.service';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-add-thread',
  templateUrl: './add-thread.component.html',
  styleUrls: ['./add-thread.component.scss']
})
export class AddThreadComponent implements OnInit {

  contactList: User[];

  newThreadForm: FormGroup;
  contacts: FormArray = this.formBuilder.array([]);

  constructor(private formBuilder: FormBuilder, private chatService: ChatService, private authService: AuthService, private dialogRef: MatDialogRef<AddThreadComponent>, private userService: UserService) { }

  ngOnInit() {
    this.newThreadForm = this.formBuilder.group({
      contactsArray: this.contacts
    });

    this.loadContacts().finally(
      () => this.createContacts()
    );
  }

  createNewThread() {

    let speakers: string[] = new Array();

    this.newThreadForm.get('contactsArray').value.forEach(element => {
      speakers.push(element.id);
    });

    speakers.push(this.authService.getLoggedUserId());

    let newThread: NewThread = {
      id: null,
      speakers: speakers,
      messages: [],
    };

    console.log(newThread);

    this.chatService.addThread(newThread).finally(
      () => this.dialogRef.close()
    );


  }

  cancel() {
    this.dialogRef.close();
  }

  private loadContacts(): Promise<void | User[]> {
    return this.userService.getContacts(this.authService.getLoggedUserId()).then(
      (contacts: User[]) => {

        this.contactList = contacts;
      }
    );
  }

  private createContacts(): void {

    for (let i = 0; i < this.contactList.length; i++) {
      this.contacts.push(new FormControl(this.contactList[i]));
    }

  }

}
