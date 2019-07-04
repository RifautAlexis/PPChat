import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { IMessage as Message } from './../Models/Message'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private hubConnection: HubConnection;
  messages: string[];

  constructor(private http: HttpClient) { 
    this.messages = [];
  }

  public openConnection() {

    this.hubConnection = new HubConnectionBuilder().withUrl("http://localhost:5000/hub/chatHub").build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log(err));

    this.hubConnection.on('receiveMessage', (message: string) => {
      this.messages.push(message);
      console.log('ReceiveMessage : ' + message + " : " + message);
    });

  }

  public sendMessage(message: Message): void {

    this.http.post(`api/chats/sendMessage`, message).subscribe(
      (data: any) => {

        console.log(data);

      }
    );

    // this.hubConnection
    //   .send("sendMessage", message)
    //   .then(() => console.log("Sended message : " + message.content))
    //   .catch(err => console.error(err));

  }

}
