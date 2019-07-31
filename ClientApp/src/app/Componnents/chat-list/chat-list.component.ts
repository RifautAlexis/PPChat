import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { IThread as Thread } from './../../Models/Thread';
import { IMessage as Message } from './../../Models/Message';
import { Router } from '@angular/router';

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
