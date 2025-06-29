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
  subMessage!: Subscription;
  subTyping!: Subscription;
  userSet = false;
  userTyping = '';
  isTyping = false;
  typingTimer: any;
  remoteUserTyping = '';

  constructor(private chat: ChatService) {}

  ngOnInit(): void {
    this.subMessage = this.chat.onMessage().subscribe((msg) => {
      this.messages.push(msg);
    });
    
    this.subTyping = this.chat.onTyping().subscribe((data) => {
      this.remoteUserTyping = data.user;
      setTimeout(() => {
        this.remoteUserTyping = '';
      }, 4000);
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

  typing(){
    clearTimeout(this.typingTimer);
    console.log('this.user', this.user);
    this.chat.sendTyping(this.user); // cambiá por el nombre real
    this.isTyping = true;
    this.typingTimer = setTimeout(() => {
      this.isTyping = false;
    }, 3000);
  }

  ngOnDestroy(): void {
    this.subMessage.unsubscribe();
    this.subTyping.unsubscribe();
  }
}