import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ChatComponent } from './chat/chat.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', component: ChatComponent },
      { path: 'chat', component: ChatComponent }
    ]),
  ],
};