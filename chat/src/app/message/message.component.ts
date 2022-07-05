import { Component, Input, OnInit } from '@angular/core';
import { StreamMessage } from 'stream-chat-angular';

@Component({
  selector: 'app-message',
  template: `
  <div>
  <b>{{ message?.user?.name }}</b> {{ message?.text }}
</div>
  `,
  styles: [ 'b {margin-right: 4px}'
  ]
})
export class MessageComponent implements OnInit {

  @Input() message: StreamMessage | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
