import { TokenService } from './../../services/token.service';
import { IMessage as Message } from './../../Models/Message';
import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { IThread as Thread } from './../../Models/Thread';
import { IMessageForm as MessageForm } from '../../Models/MessageForm';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() thread: Thread;

  chatForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private chatService: ChatService, private tokenService: TokenService) { }

  ngOnInit() {

    this.chatForm = this.formBuilder.group({
      messageForm: ['', Validators.required]
    });

    if (!this.authService.isLogged()) {
      this.router.navigate(['/']);
    }

  }

  onSubmit() {

    if (this.chatForm.invalid) {
      return;
    }

    let message: MessageForm = {
      sender: this.authService.getLoggedUserId(),
      thread: this.thread.id,
      content: this.chatForm.get("messageForm").value,
      createdAt: new Date(),
      seeAt: new Date()
    };

    this.chatService.sendMessage(message);

    this.chatForm.reset();
  }

}
