import { Component, OnInit } from '@angular/core';
import  io from 'socket.io-client';
import { AnyResource } from 'stream-chat';

const SOCKET_ENDPOINT = 'localhost:3000';

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.scss']
})
export class ChatInboxComponent implements OnInit {


  socket: any;
  message: any;
  constructor() { }

  ngOnInit() {
    this.setupSocketConnection();
  }
  

  
  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: string) => {
    if (data) {
     const element = document.createElement('li');
     element.innerHTML = data;
     element.style.background = 'white';
     element.style.padding =  '15px 30px';
     element.style.margin = '10px';
     document.getElementById('message-list');
     }
   });
 }

 SendMessage() {
  this.socket.emit('message', this.message);
  const element = document.createElement('li');
  element.innerHTML = this.message;
  element.style.background = 'white';
  element.style.padding =  '15px 30px';
  element.style.margin = '10px';
  element.style.textAlign = 'right';
  // document.getElementById('message-list').appendChild(element);
  this.message = '';
}


}
