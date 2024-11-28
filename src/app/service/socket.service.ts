import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import {API_URL} from './config';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(API_URL, {
      transports: ['websocket'],
    });
  }

  getUserCount(callback: (count: number) => void): void {
    this.socket.on('userCount', callback);
  }

  disconnect(): void {
    this.socket.disconnect();
  }
}
