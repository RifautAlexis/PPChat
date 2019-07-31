import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { IMessage as Message } from './../Models/Message';
import { IMessageForm as MessageForm } from './../Models/MessageForm';
import { IThread as Thread } from './../Models/Thread';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private hubConnection: HubConnection;


  constructor(private http: HttpClient, private authService: AuthService) { }

  public openConnection() {

    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5000/hub/chatHub')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log(err));

  }

  public getThreadsByUser(userId: string): Promise<Thread[]> {
    return this.http.get<Thread[]>(`api/threads?userId=` + userId).toPromise();
  }

  public getHubConnection(): HubConnection {
    return this.hubConnection;
  }

  public sendMessage(message: MessageForm): Promise<Message> {

    return this.http.post<Message>(`api/chats/sendMessage`, message).toPromise();
  }

}
