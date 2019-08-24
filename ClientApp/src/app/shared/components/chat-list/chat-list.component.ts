import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { IThread as Thread } from '@shared/models/Thread';
import { IMessage as Message } from '@shared/models/Message';
import { IUser as User } from '@shared/models/User';
import { INewThread as NewThread } from '@shared/models/NewThread';

import { AuthService } from '@shared/services/auth.service';
import { ChatService } from '@shared/services/chat.service';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})

export class ChatListComponent implements OnInit {

  showModal = false;

  threads: Thread[];

  selectedThread: Thread;

  searchThread: string;

  searchedUser: string;

  contactList: User[];

  /*
    Id in URL param
  */
  threadId: string;

  newThreadForm: FormGroup;
  contacts: FormArray = this.formBuilder.array([]);

  constructor(private chatService: ChatService, private userService: UserService, private router: Router, private authService: AuthService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.threads = [];
  }

  ngOnInit() {

    this.newThreadForm = this.formBuilder.group({
      contactsArray: this.contacts
    });

    this.chatService.openConnection();

    this.loadThreads()
      .finally(
        () => {
          this.route.paramMap.subscribe(params => {

            if (params.has('threadId')) {

              let id = params.get('threadId');

              if (this.threads.find(t => t.id === id) !== null) {

                this.threadId = id;
                this.selectedThread = this.threads.find(t => t.id === this.threadId);

              } else {
                if (this.threads.length > 0) {
                  this.threadId = this.threads[0].id;
                  this.selectedThread = this.threads.find(t => t.id === this.threadId);
                }

              }

            } else {
              console.log("no param");

              if (this.threads.length > 0) {
                this.threadId = this.threads[0].id;
                this.selectedThread = this.threads.find(t => t.id === this.threadId);
              }
            }
          });

        }
      );

    this.chatService.getHubConnection().on('receiveMessage', (message: Message) => {

      let thread: Thread = this.threads.find(t => t.id === message.thread);
      thread.messages.push(message);

    });

  }

  selectThread(threadId: string) {
    this.router.navigate(['/me/chats/' + threadId]);
  }

  removeThread(threadId: string) {
    this.chatService.removeThread(threadId).then(
      (isRemoved: boolean) => {
        if (isRemoved) {
          this.loadThreads();
        }
      }
    );
  }

  loadThreads(): Promise<void | Thread[]> {
    return this.chatService.getThreadsByUser(this.authService.getLoggedUserId())
      .then(
        (threads: Thread[]) => {
          this.threads = threads;

        }
      );
  }

  toggleModal() {
    if (!this.showModal) {
      this.loadContacts().finally(
        () => {

          this.createContacts();

        });
    }

    this.showModal = !this.showModal;
  }

  createNewThread() {
    this.toggleModal();

    let speakers: string[] = new Array();

    this.newThreadForm.controls.contactsArray.controls.forEach(element => {
      speakers.push(element.controls.user.value.id);
    });

    speakers.push(this.authService.getLoggedUserId());

    let newThread: NewThread = {
      id: null,
      speakers: speakers,
      messages: [],
    };

    console.log(newThread);

    this.chatService.addThread(newThread).finally(
      () => this.loadThreads()
    );


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
      this.contacts.push(this.formBuilder.group({ user: this.contactList[i] }));
    }

  }
}
