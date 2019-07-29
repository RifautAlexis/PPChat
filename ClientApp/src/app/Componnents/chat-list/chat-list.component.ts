import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { IThread as Thread } from './../../Models/Thread';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  threads: Observable<Thread[]>;

  constructor(private chatService: ChatService, private router: Router, private authService: AuthService, private userService: UserService) { }

  ngOnInit() {

    if (!this.authService.isLogged()) {
      this.router.navigate(['/']);
    }

    this.chatService.getThreads().subscribe(
      () => {
        this.threads = this.chatService.getThreads();
      }
    );

  }

  onClick(threadId: string) {
    this.chatService.setSelectedThread(threadId);
  }

}
