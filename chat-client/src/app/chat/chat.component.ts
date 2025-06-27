import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  username = '';
  message = '';
  messages: any[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.onMessage().subscribe((msg) => {
      this.messages.push(msg);
    });
  }

  join(): void {
    this.chatService.join(this.username);
  }

  send(): void {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }
}
