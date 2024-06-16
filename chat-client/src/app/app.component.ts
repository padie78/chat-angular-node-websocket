import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  newMessage = '';
  messageList: string[] = [];

  constructor(private socketService: SocketService) {}

  ngOnInit(){
    this.socketService.getNewMessage().subscribe((message: string) => {
      console.log('message: ', message)
      this.messageList.push(message);
    })
  }

  sendMessage() {
    this.socketService.sendMessage("hi Diego");
    this.newMessage = '';
  }
}