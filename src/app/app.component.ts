import { Component, NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCard } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from './api.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private lambdaApi: ApiService) {}
  title = 'lambda-mini';
  statusText = 'Press button to check status';
  panelOpenState = false;

  sampleMethod(): void {
    console.log('sample method:');
    console.log(this.lambdaApi.sampleString());
  }
}
