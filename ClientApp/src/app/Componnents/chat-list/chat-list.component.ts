import { IMessage as Message } from './../../Models/Message';
import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  private _hubConnection: HubConnection;
  message: Message;
  messages: Message[] = [];

  chatForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private chatService: ChatService) { }

  ngOnInit() {

    this.chatForm = this.formBuilder.group({
      messageForm: ['', Validators.required]
    });

    if (!this.authService.isLogged()) {
      this.router.navigate(['/']);
    }

    this.messages = this.messages;

    this.chatService.openConnection();

  }

  onSubmit() {

    if (this.chatForm.invalid) {
      return;
    }

    let id: string;
    this.authService.getUserLoggedIn().subscribe(x => id = x.id);

    this.message = {
      id: "000",
      sender: id,
      recipient: "000",
      content: this.chatForm.get("messageForm").value,
      createdAt: new Date(),
      seeAt: new Date()
    };

    console.log(this.message);

    this.chatService.sendMessage(this.message);

    console.log(this.chatService.messages);
  }

}