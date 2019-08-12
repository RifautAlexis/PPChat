import { AuthService } from '@shared/services/auth.service';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { IMessage as Message } from '@shared/models/Message';
import { IMessageForm as MessageForm } from '@shared/models/MessageForm';
import { IThread as Thread } from '@shared/models/Thread';
import { HttpClient } from '@angular/common/http';

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

  /*
  Mise en suspend
  public removeThread(threadId: string): Promise<Boolean> {
    return this.http.post<Boolean>(`api/threads/delete`, threadId).toPromise();
  }
  */
}
