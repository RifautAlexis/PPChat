import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { MatDialog } from '@angular/material';

import { IThread as Thread } from '@shared/models/Thread';
import { IMessage as Message } from '@shared/models/Message';

import { AuthService } from '@shared/services/auth.service';
import { ChatService } from '@shared/services/chat.service';

import { AddThreadComponent } from '@shared/components/add-thread/add-thread.component';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})

export class ChatListComponent implements OnInit {

  threads: Thread[];

  selectedThread: Thread;

  searchThread: string;

  searchedUser: string;

  /*
    Id in URL param
  */
  threadId: string;

  contacts: FormArray = this.formBuilder.array([]);

  constructor(private chatService: ChatService, private router: Router, private authService: AuthService, private route: ActivatedRoute, private formBuilder: FormBuilder, public dialog: MatDialog) {
    this.threads = [];
  }

  ngOnInit() {

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

  openDialogAddThread(): void {
    const dialogRef = this.dialog.open(AddThreadComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.loadThreads();
      console.log('The dialog was closed');
      console.log(result);
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

}
