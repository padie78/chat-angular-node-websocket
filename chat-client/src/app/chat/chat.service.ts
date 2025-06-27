import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private socket: Socket;

  constructor() {
    console.log('constructor');
    this.socket = io('http://chat-server:3000'); // usar nombre de servicio en Docker
  }

  join(username: string): void {
    this.socket.emit('join', username);
  }

  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  onMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    });
  }
}
