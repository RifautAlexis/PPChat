import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { TokenService } from '@shared/services/token.service';
import { AuthService } from '@shared/services/auth.service';
import { ChatService } from '@shared/services/chat.service';

import { IThread as Thread } from '@shared/models/Thread';
import { IMessageForm as MessageForm } from '@shared/models/MessageForm';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input() thread: Thread;

  chatForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private chatService: ChatService) { }

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
