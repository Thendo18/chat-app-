import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StreamChatModule, StreamAutocompleteTextareaModule } from 'stream-chat-angular';
import { MessageComponent } from './message/message.component';
import { ChannelPreviewComponent } from './channel-preview/channel-preview.component';
@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    ChannelPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    TranslateModule.forRoot(), 
    StreamAutocompleteTextareaModule,
    StreamChatModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
