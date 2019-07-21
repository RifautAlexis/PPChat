import { AuthService } from './../../services/auth.service';
import { TokenService } from './../../services/token.service';
import { IMessage as Message } from './../../Models/Message';
import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { Observable } from 'rxjs';
import { IThread as Thread } from './../../Models/Thread'
import { threadId } from 'worker_threads';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  threads: Promise<Thread[]>;

  constructor(private chatService: ChatService, private authService: AuthService) { }

  ngOnInit() {

    let userId: string = this.authService.getLoggedUserId();

    this.threads = this.chatService.getThreadsByUser(userId);

  }

  onClick(threadId: string) {
    this.chatService.setSelectedThread(threadId);
  }

}
