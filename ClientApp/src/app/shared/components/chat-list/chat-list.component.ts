import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IThread as Thread } from '@shared/models/Thread';
import { IMessage as Message } from '@shared/models/Message';

import { AuthService } from '@shared/services/auth.service';
import { ChatService } from '@shared/services/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})

export class ChatListComponent implements OnInit {

  threads: Thread[];

  selectedThread: Thread;

  constructor(private chatService: ChatService, private router: Router, private authService: AuthService) {
    this.threads = [];
  }

  ngOnInit() {

    if (!this.authService.isLogged()) {
      this.router.navigate(['/']);
    }

    this.chatService.openConnection();

    this.chatService.getThreadsByUser(this.authService.getLoggedUserId()).then(
      (threads: Thread[]) => {
        this.threads = threads;

        if (this.threads.length !== 0) {
          this.selectedThread = this.threads[0];
        }

      }
    );

    this.chatService.getHubConnection().on('receiveMessage', (message: Message) => {

      let thread: Thread = this.threads.find(t => t.id === message.thread);
      thread.messages.push(message);

    });

  }

  selectThread(threadId: string) {
    this.selectedThread = this.threads.find(t => t.id === threadId);
  }

}