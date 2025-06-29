import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  private users = new Map<string, string>(); // clientId -> user

  constructor(private readonly chatService: ChatService) {}

  afterInit() {
    console.log('WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.users.delete(client.id);
    this.emitUserList();
  }

  @SubscribeMessage('register')
  handleRegister(@MessageBody() data: { user: string }, @ConnectedSocket() client: Socket) {
    this.users.set(client.id, data.user);
    this.emitUserList();
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: { user: string; text: string; timestamp: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.broadcast.emit('message', data);
  }

  @SubscribeMessage('typing')
  handleTyping(@MessageBody() data: { user: string }, @ConnectedSocket() client: Socket) {
    client.broadcast.emit('typing', data);
  }

  private emitUserList() {
    const users = Array.from(this.users.values());
    this.server.emit('users', users);  
  }

}
