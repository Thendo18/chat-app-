// import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
// import { ChatClientService, ChannelService, StreamI18nService, MessageContext, CustomTemplatesService, ChannelPreviewContext } from 'stream-chat-angular';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss'],
// })
// export class AppComponent implements OnInit, AfterViewInit {
//   title = 'chat';
//   @ViewChild('customMessageTemplate') messageTemplate!: TemplateRef<MessageContext>;
//   @ViewChild('customChannelPreviewTemplate') channelPreviewTemplate!: TemplateRef<ChannelPreviewContext>;

//   constructor(
//     private chatService: ChatClientService,
//     private channelService: ChannelService,
//     private streamI18nService: StreamI18nService,
//     private customTemplatesService: CustomTemplatesService
//   ) {
//     const apiKey = 'dz5f4d5kzrue';
//     const userId = 'royal-grass-8';
//     const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoicm95YWwtZ3Jhc3MtOCIsImV4cCI6MTY1NzAyMjUwM30.deV5rRSFEjIDTPKO-UF_WI64OEZahnyl9Wl686ohsYU';
//     this.chatService.init(apiKey, userId, userToken);
//     this.streamI18nService.setTranslation();
//   }

//   async ngOnInit() {
//     const channel = this.chatService.chatClient.channel('messaging', 'talking-about-angular', {
//       // add as many custom fields as you'd like
//       image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
//       name: 'Talking about Angular',
//     });
//     await channel.create();
//     this.channelService.init({
//       type: 'messaging',
//       id: { $eq: 'talking-about-angular' },
//     });
//   }

//   ngAfterViewInit(): void {
//     this.customTemplatesService.messageTemplate$.next(this.messageTemplate);
//     this.customTemplatesService.channelPreviewTemplate$.next(this.channelPreviewTemplate);
//   }
// }



import { Component } from '@angular/core';
import { StreamChat, ChannelData, Message, User } from 'stream-chat';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-chat';
  channel: ChannelData | undefined;
  username = '';
  messages: Message[] = [];
  newMessage = '';
  channelList: ChannelData[] | undefined;
  chatClient: any;
  currentUser: User | undefined;

  async joinChat() {
    const { username } = this;
    try {
      const response = await axios.post('http://localhost:5500/join', {
        username,
      });
      const { token } = response.data;
      const apiKey = response.data.api_key;

      this.chatClient = new StreamChat(apiKey);

      this.currentUser = await this.chatClient.setUser(
        {
          id: username,
          name: username,
        },
        token
      );

      const channel = this.chatClient.channel('team', 'talkshop');
      await channel.watch();
      this.channel = channel;
      this.messages = channel.state.messages;
      this.channel.on('message.new', event => {
        this.messages = [...this.messages, event.message];
      });

      const filter = {
        type: 'team',
        members: { $in: [`${this.currentUser.me.id}`] },
      };
      const sort = { last_message_at: -1 };

      this.channelList = await this.chatClient.queryChannels(filter, sort, {
        watch: true,
        state: true,
      });
    } catch (err) {
      console.log(err);
      return;
    }
  }

  async sendMessage() {
    if (this.newMessage.trim() === '') {
      return;
    }

    try {
      await this.channel.sendMessage({
        text: this.newMessage,
      });
      this.newMessage = '';
    } catch (err) {
      console.log(err);
    }
  }
}