import { NewMessage } from './../Models/NewMessage';
import { throwError, Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { IMessage as Message } from './../Models/Message';
import { IThread as Thread } from './../Models/Thread';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private hubConnection: HubConnection;

  private threads: BehaviorSubject<Thread[]>;

  private messages: BehaviorSubject<Message[]>;

  private selectedThread: BehaviorSubject<string>;

  constructor(private http: HttpClient, private authService: AuthService) {

    this.threads = new BehaviorSubject<Thread[]>([]);
    this.getThreadsByUser(this.authService.getLoggedUserId()).subscribe(
      (threads: Thread[]) => {
        this.threads.next(threads);
      }
    );

    this.messages = new BehaviorSubject<Message[]>([]);
    this.selectedThread = new BehaviorSubject<string>('');
  }

  public openConnection() {

    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5000/hub/chatHub')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log(err));

    this.hubConnection.on('receiveMessage', (message: Message) => {

      let newMessages: Message[] = this.messages.getValue();
      newMessages.push(message);
      this.messages.next(newMessages);

    });

  }

  public getThreads(): Observable<Thread[]> {
    return this.threads.asObservable();
  }

  public setSelectedThread(threadId: string) {
    this.selectedThread.next(threadId);
  }

  public getSelectedThread(): Observable<string> {
    return this.selectedThread.asObservable();
  }

  public getValueSelectedThread(): string {
    return this.selectedThread.getValue();
  }

  public getMessages(): Observable<Message[]> {
    return this.messages.asObservable();
  }

  public getThreadsByUser(userId: string): Observable<Thread[]> {
    return this.http.get<Thread[]>(`api/threads?userId=` + userId);
  }

  public getMessagesByThread(threadId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`api/chats?threadId=` + threadId);
  }

  public sendMessage(message: Message, threadId: string): Promise<Object> {
    let data: NewMessage = {
      message: message,
      threadId: threadId
    };
    return this.http.post<any>(`api/chats/sendMessage`, data).toPromise();
  }

}
