import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IThread as Thread } from '@shared/models/Thread';
import { IMessage as Message } from '@shared/models/Message';

import { AuthService } from '@shared/services/auth.service';
import { ChatService } from '@shared/services/chat.service';

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

  constructor(private chatService: ChatService, private router: Router, private authService: AuthService, private route: ActivatedRoute) {
    this.threads = [];
  }

  ngOnInit() {

    this.chatService.openConnection();

    this.chatService.getThreadsByUser(this.authService.getLoggedUserId())
      .then(
        (threads: Thread[]) => {
          this.threads = threads;

        }
      )
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

    // this.route.paramMap.subscribe(params => {

    //   if (params.has('threadId')) {
    //     this.threadId = params.get('threadId');

    //   } else {
    //     console.log('no param like this');
    //     this.router.navigate(['/me/' + this.threadId]);
    //   }

    // });

  }

  selectThread(threadId: string) {
    // this.selectedThread = this.threads.find(t => t.id === threadId);
    this.router.navigate(['/me/chats/' + threadId]);
  }

  /*
  Mise en suspend
  removeThread(threadId: string) {
    this.chatService.removeThread(threadId).then(
      (isRemoved: boolean) => {

      }
    );
  }
  */

}
