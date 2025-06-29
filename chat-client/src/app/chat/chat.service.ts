import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  sendMessage(msg: { user: string; text: string; timestamp: string }) {
    this.socket.emit('message', msg);
  }

  typingMessage(msg: { user: string; text: string; timestamp: string }) {
    this.socket.emit('typing', msg);
  }
  
  onMessage(): Observable<any> {
    return new Observable(observer => {
      const handler = (data: any) => observer.next(data);
      this.socket.on('message', handler);
      return () => {
        this.socket.off('message', handler);
      };
    });
  }

  sendTyping(user: string) {
    this.socket.emit('typing', { user });
  }

  onTyping(): Observable<any>{
    return new Observable(observer => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
    });  
  }

  onUsers(): Observable<string[]> {
    return new Observable(observer => {
      this.socket.on('users', (userList: string[]) => {
        observer.next(userList);
      });
    });
  }

  register(user: string) {
    this.socket.emit('register', { user });
  }

}

