import { TokenService } from './../../services/token.service';
import { IMessage as Message } from './../../Models/Message';
import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages: Observable<Message[]>;

  chatForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private chatService: ChatService, private tokenService: TokenService) { }

  ngOnInit() {

    this.chatForm = this.formBuilder.group({
      messageForm: ['', Validators.required]
    });

    if (!this.authService.isLogged()) {
      this.router.navigate(['/']);
    }

    // Surveille le changement de conversation par un click
    this.chatService.getSelectedThread().subscribe(
      (threadId: string) => {

        this.messages = this.chatService.getMessagesByThread(threadId);

      }
    );

    // Met à jour les messages
    this.chatService.getMessages().subscribe(
      (messages: Message[]) => {
        this.messages = this.chatService.getMessages();
      }
    );

    this.chatService.openConnection();

  }

  onSubmit() {

    if (this.chatForm.invalid) {
      return;
    }

    let message: Message = {
      sender: this.authService.getLoggedUserId(),
      content: this.chatForm.get("messageForm").value,
      createdAt: new Date(),
      seeAt: new Date()
    };

    console.log(message);
    this.chatService.sendMessage(message, this.chatService.getValueSelectedThread());
  }

}
