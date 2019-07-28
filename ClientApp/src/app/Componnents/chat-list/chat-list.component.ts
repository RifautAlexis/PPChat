import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { IThread as Thread } from './../../Models/Thread';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  threads: Promise<Thread[]>;

  constructor(private chatService: ChatService, private authService: AuthService, private userService: UserService) { }

  ngOnInit() {

    let userId: string = this.authService.getLoggedUserId();

    this.threads = this.chatService.getThreadsByUser(userId);

  }

  onClick(threadId: string) {
    this.chatService.setSelectedThread(threadId);
  }

  searchName(speakers: string[]): string {

    // this.userService.getNameSpeakers(speakers).then(
    //   (names: string) => {
    //     return names;
    //   }
    // );

    return "";
  }

}
