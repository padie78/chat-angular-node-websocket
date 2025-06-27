import { Injectable } from '@nestjs/common';

interface Message {
  user: string;
  text: string;
  timestamp: Date;
}

@Injectable()
export class ChatService {
  private messages: Message[] = [];

  addMessage(message: Message) {
    this.messages.push(message);
    if (this.messages.length > 100) {
      this.messages.shift();
    }
  }

  getMessages(): Message[] {
    return this.messages;
  }
}
