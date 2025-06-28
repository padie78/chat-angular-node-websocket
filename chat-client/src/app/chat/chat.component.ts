import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from './chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: any[] = [];
  user = '';
  text = '';
  sub!: Subscription;
  userSet = false;

  constructor(private chat: ChatService) {}

  ngOnInit(): void {
    this.sub = this.chat.onMessage().subscribe((msg) => {
      this.messages.push(msg);
    });
  }

  setUser() {
    if (this.user.trim()) {
      this.userSet = true;
      this.chat.sendMessage({
        user: 'Sistema',
        text: `${this.user} join to chat`,
        timestamp: new Date().toISOString()
      });
    }
  }

  send() {
    if (this.text.trim()) {
      this.chat.sendMessage({
        user: this.user,
        text: this.text,
        timestamp: new Date().toISOString()
      });

      this.messages.push({
        user: this.user,
        text: this.text,
        timestamp: new Date().toISOString()
      });

      this.text = '';
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}