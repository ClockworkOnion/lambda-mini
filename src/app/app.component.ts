import { Component, NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCard } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from './api.service';
import { MatButton } from '@angular/material/button';
import { StatusTextService } from './status-text.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private lambdaApi: ApiService,
    private statusService: StatusTextService
  ) {}

  ngOnInit(): void {
    this.statusService.setMainComponent(this); // Register to enable status messages
  }

  title = 'lambda-mini';
  statusText = 'Welcome to Lambda Mini';
  panelOpenState = false;

  sampleMethod(): void {
    console.log('sample method:');
    console.log(this.lambdaApi.sampleString());
  }

  addMsg(): void {
    this.statusService.pushStatusMessage('This is a test message');
  }

  updateStatusText(newStatusText: string): void {
    this.statusText = newStatusText;
  }
}
