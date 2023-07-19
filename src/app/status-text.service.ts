import { Injectable } from '@angular/core';
import { AppComponent } from './app.component';

/**
 * This service is used to set the status text in the main component, so it will be displayed independently of the selected panel.
 */
@Injectable({
  providedIn: 'root',
})
export class StatusTextService {
  private mainComponent: AppComponent | undefined;
  private statusMessages: string[] = ['Welcome to Lambda Mini'];
  private maxMessages = 10;

  constructor() {}

  public setMainComponent(mainComponent: AppComponent): void {
    this.mainComponent = mainComponent;
  }

  public pushStatusMessage(message: string): void {
    this.statusMessages.push(
      '(' + this.getTimestamp() + ')\n' + message + '\n'
    );
    if (this.statusMessages.length > this.maxMessages) {
      this.statusMessages.shift();
    }
    this.mainComponent?.updateStatusText(this.messagesAsString());
  }

  private getTimestamp(): string {
    const date = new Date();
    return (
      date.getHours().toString().padStart(2, '0') +
      ':' +
      date.getMinutes().toString().padStart(2, '0') +
      ':' +
      date.getSeconds().toString().padStart(2, '0')
    );
  }

  private messagesAsString(): string {
    let messages = '';
    this.statusMessages.reverse().forEach((message) => {
      messages += message + '\n';
    });
    this.statusMessages.reverse();
    return messages;
  }
}
